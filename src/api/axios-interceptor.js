import axios from "axios";
import history from "../lib/utils/history";

const axiosInterceptor = axios.create({
  baseURL: "https://todo-app-backend-rust-one.vercel.app/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInterceptor.interceptors.request.use(
  (config) => {
    const authToken = sessionStorage.getItem("auth_token");
    if (authToken) {
      config.headers.authorization = `Bearer ${authToken}`;
      return config;
    } else {
      return Promise.reject({
        response: {
          status: 401,
          code: "unauthorized",
          message: "No token found",
        },
      });
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInterceptor.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      if (error.response?.status === 401) {
        sessionStorage.clear();
        history.replace("/signin");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInterceptor;
