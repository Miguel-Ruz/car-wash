async function patchWasher(dataToSend, id) {
  try {
    const requestOptions = {
      method: "PATCH", // Usa el método especificado (GET o POST)
      headers: {
        "Content-Type": "application/json", // Ajusta los encabezados según sea necesario
      },
      body: dataToSend ? JSON.stringify(dataToSend) : undefined, // Si se proporciona dataToSend, lo incluimos en el cuerpo
    };
    const res = await fetch(`http://localhost:3000/api/washer?id=${id}`, requestOptions);
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export default patchWasher;