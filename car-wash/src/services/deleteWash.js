async function deleteWash(id) {
  try {
    const requestOptions = {
      method: "DELETE", // Usa el método especificado (GET o POST)
    };
    const res = await fetch(`http://localhost:3000/api/wash?id=${id}`, requestOptions);
    // Verificar si el estado HTTP no es exitoso
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    return { success: true, data };  // Devuelve la respuesta en caso de éxito
  } catch (error) {
    // Devuelve el error para que la función que llama pueda manejarlo
    return { success: false, error: error.message };
  }
}

export default deleteWash;
