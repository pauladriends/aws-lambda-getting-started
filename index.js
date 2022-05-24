const axios = require("axios");

const httpInstance = axios.create({
  baseURL: "https://api-adresse.data.gouv.fr/search",
});

exports.handler = async (event) => {
  console.debug(event);
  try {
    const res = await httpInstance.get(`?q=${event?.address}`);
    return {
      statusCode: res.status,
      headers: {
        "Content-type": res.headers["content-type"],
      },
      body: JSON.stringify(res.data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.response.status,
      body: error.response.data,
      headers: {
        "Content-type": error.response.headers["content-type"],
      },
    };
  }
};
