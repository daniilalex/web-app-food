//function post data to the server
const postData = async (url, data) => {
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: data,
  });

  return await result.json(); //return promise (js object)
};

//function of getting resources(data) from server
const getData = async (url) => {
  const result = await fetch(url);
  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }
  return await result.json(); //return promise (js object)
};
export { postData };
export { getData };
