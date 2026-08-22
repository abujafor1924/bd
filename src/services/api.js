import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
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

const replaceHost = (data) => {
  if (typeof data === "string") {
    return data.replace(/https?:\/\/66\.29\.151\.40:6060/g, "");
  }
  if (Array.isArray(data)) {
    return data.map(replaceHost);
  }
  if (data !== null && typeof data === "object") {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        data[key] = replaceHost(data[key]);
      }
    }
  }
  return data;
};

api.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      response.data = replaceHost(response.data);
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default api;


export const fixImageUrl = (url) => {
  if (!url) return url;

  return url.replace(
    "http://66.29.151.40:6060",
    ""
  );
};