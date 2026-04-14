import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
});

instance.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (auth?.token) {
    config.headers.Authorization = auth.token;
  }
  return config;
});

export default instance;
