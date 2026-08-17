import axios from "axios";

const api = axios.create({
  baseURL: "http://66.29.151.40:6060/api/v1",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;


