import axios from "axios";
import { getToken } from "./LocalStorage";

const customAxios = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

customAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customAxios;
