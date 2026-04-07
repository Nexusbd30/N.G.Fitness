import axios from "axios";
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "../lib/authStorage";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

let refreshPromise = null;

http.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = getRefreshToken();

    if (
      error.response?.status !== 401 ||
      originalRequest?._retry ||
      !refreshToken ||
      originalRequest?.url?.includes("/auth/login") ||
      originalRequest?.url?.includes("/auth/register") ||
      originalRequest?.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (!refreshPromise) {
      refreshPromise = axios
        .post(`${http.defaults.baseURL}/auth/refresh`, {
          refresh_token: refreshToken,
        })
        .then((response) => {
          setTokens(response.data);
          return response.data.access_token;
        })
        .catch((refreshError) => {
          clearTokens();
          throw refreshError;
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    const newAccessToken = await refreshPromise;
    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

    return http(originalRequest);
  },
);

export default http;
