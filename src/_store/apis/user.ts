import axios from "axios";




export const getPost = async (payload: any) => {
  try {
    return await axios
      .get(`https://jsonplaceholder.typicode.com/todos/${payload}`)
      .then((response) => {
        return { status: response.status, body: response.data };
      })
      .catch((err) => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: "Failed to connect" };
  }
};