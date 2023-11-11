import { useState, useEffect } from "react";

interface Washer {
  id: string;
  name: string;
  documentId: string;
  createdAt: string;
  status: boolean;
  washes: number;
  earnings: number;
}

type HttpMethod = "GET" | "POST";

const useFetchData = (
  url: string,
  method: HttpMethod = "GET",
  dataToSend?: Record<string, any>
) => {
  const [data, setData] = useState<Washer[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions: RequestInit = {
          method, // Usa el método especificado (GET o POST)
          headers: {
            "Content-Type": "application/json", // Ajusta los encabezados según sea necesario
          },
          body: dataToSend ? JSON.stringify(dataToSend) : undefined, // Si se proporciona dataToSend, lo incluimos en el cuerpo
        };
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData: Washer[] = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
