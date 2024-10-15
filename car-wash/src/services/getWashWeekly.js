async function getWashWeekly() {
  try {
    const requestOptions = {
      method: "GET",
     };
    const res = await fetch("http://localhost:3000/api/washer?type=weekly", requestOptions);
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export default getWashWeekly;
