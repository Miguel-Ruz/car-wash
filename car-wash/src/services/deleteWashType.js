async function deleteWashType(id) {
  try {
    const requestOptions = {
      method: "DELETE", // Usa el método especificado (GET o POST)
    };
    const res = await fetch(`http://localhost:3000/api/washtype?id=${id}`, requestOptions);
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export default deleteWashType;
