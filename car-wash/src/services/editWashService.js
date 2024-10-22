async function editWashService(dataToSend, idWash) {
  try {
    const requestOptions = {
      method: "PATCH", // Usa el método especificado (GET o POST)
      headers: {
        "Content-Type": "application/json", // Ajusta los encabezados según sea necesario
      },
      body: dataToSend ? JSON.stringify(dataToSend) : undefined, // Si se proporciona dataToSend, lo incluimos en el cuerpo
    };
    const res = await fetch(
      `http://localhost:3000/api/wash?id=${idWash}`,
      requestOptions
    );
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }
    const data = await res.json();
    return { success: true, data }; 
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export default editWashService;