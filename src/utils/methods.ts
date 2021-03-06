export const post = async (path: string, data?: any, options?: RequestInit) => {
  const fetchedData = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    ...options,
  });

  const parsedData = await fetchedData.json();

  return parsedData;
};
