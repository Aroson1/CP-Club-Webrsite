import axios from "axios";
import Cookies from "js-cookie";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

const apiClient = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleResponse = (response) => {
  if (response.data.success) {
    return response.data.body;
  } else {
    throw new Error("API call failed");
  }
};

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get("refreshToken");
        const { data } = await apiClient.post("/v1/refresh-token", {
          refreshToken,
        });

        Cookies.set("accessToken", data.accessToken, { expires: 1 / 24 });

        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;

        console.log("Retrying original request");

        return apiClient(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

const apiService = {
  get: async (url, params) => {
    try {
      const response = await apiClient.get(url, { params });
      return handleResponse(response);
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while fetching data.");
    }
  },
  post: async (url, data) => {
    try {
      const response = await apiClient.post(url, data);
      return handleResponse(response);
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while posting data.");
    }
  },
  put: async (url, data) => {
    try {
      const response = await apiClient.put(url, data);
      return handleResponse(response);
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while updating data.");
    }
  },
  delete: async (url) => {
    try {
      const response = await apiClient.delete(url);
      return;
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while deleting data.");
    }
  },
};

export default apiService;
