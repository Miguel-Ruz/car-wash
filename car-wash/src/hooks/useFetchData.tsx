import { useState, useEffect } from "react";

interface Washer {
  id: string;
  name: string;
  documentId: string;
  createdAt: string;
  status: boolean;
  washes: any[]; // Ajusta este tipo al tipo real de "washes"
}

const useFetchData = (url: string) => {
  const [data, setData] = useState<Washer[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
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
