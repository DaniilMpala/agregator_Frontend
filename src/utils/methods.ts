export const post = async (path: string, data?: any, options?: RequestInit) => {
  const fetchedData = await fetch("http://localhost:3000/"+path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": localStorage?.accessToken
    },
    body: JSON.stringify(data),
    ...options,
  });

  const parsedData = await fetchedData.json();

  return parsedData;
};
