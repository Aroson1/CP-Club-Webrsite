import axios from "axios";
import Cookies from "js-cookie";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

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

/**
 * API Service for handling HTTP requests.
 *
 * @module apiService
 *
 * @typedef {Object} ApiService
 * @property {function(string, Object): Promise<Object>} get - Sends a GET request to the specified URL with optional parameters.
 * @property {function(string, Object): Promise<Object>} post - Sends a POST request to the specified URL with the provided data.
 * @property {function(string, Object): Promise<Object>} put - Sends a PUT request to the specified URL with the provided data.
 * @property {function(string): Promise<void>} delete - Sends a DELETE request to the specified URL.
 *
 * @example
 * const data = await apiService.get('/api/data', { id: 1 });
 *
 * @example
 * await apiService.post('/api/data', { name: 'New Item' });
 *
 * @example
 * await apiService.put('/api/data/1', { name: 'Updated Item' });
 *
 * @example
 * await apiService.delete('/api/data/1');
 */
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
