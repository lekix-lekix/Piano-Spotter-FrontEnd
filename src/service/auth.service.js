import axios from "axios";

const BACKEND_AUTH_URL = import.meta.env.VITE_BACKEND_AUTH_API_URL;

const authApi = axios.create({
  baseURL: BACKEND_AUTH_URL,
});

authApi.login = async (user) => {
  try {
    const response = await authApi.post("/login", user);
    return response;
  } catch (error) {
    console.log(error.response.data.message);
    return error;
  }
};

authApi.signup = async (user) => {
  try {
    const response = await authApi.post("/signup", user);
    return response;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

authApi.verify = async () => {
  try {
    const response = await authApi.get("/verify");
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export default authApi;
