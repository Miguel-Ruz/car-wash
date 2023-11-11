async function patchWash(idWash) {
  try {
    const requestOptions = {
      method: "PATCH", // Usa el método especificado (GET o POST)
      headers: {
        "Content-Type": "application/json", // Ajusta los encabezados según sea necesario
      },
      body: JSON.stringify({
        status: "COMPLETED",
      }),
    };
    const res = await fetch(
      `http://localhost:3000/api/wash?id=${idWash}`,
      requestOptions
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export default patchWash;
