async function postWasher(dataToSend) {
  try {
    const requestOptions = {
      method: "POST", // Usa el método especificado (GET o POST)
      headers: {
        "Content-Type": "application/json", // Ajusta los encabezados según sea necesario
      },
      body: dataToSend ? JSON.stringify(dataToSend) : undefined, // Si se proporciona dataToSend, lo incluimos en el cuerpo
    };
    const res = await fetch("http://localhost:3000/api/washer", requestOptions);
    const data = await res.json();
    //cerrar modal y recargar la pagina
    // if (data) {
    //   handleModalClose();
    //   window.location.reload();
    //   console.log("hola", data.data);
    // }
    return data.data;
  } catch (error) {
    return error;
  }
}

export default postWasher;
