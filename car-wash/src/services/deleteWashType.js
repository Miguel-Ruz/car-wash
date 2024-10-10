async function deleteWashType(id) {
  try {
    const requestOptions = {
      method: "DELETE", // Usa el método especificado (GET o POST)
    };
    const res = await fetch(`http://localhost:3000/api/washtype?id=${id}`, requestOptions);
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export default deleteWashType;
