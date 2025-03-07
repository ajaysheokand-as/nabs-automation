import axios from "axios";

// Base URL Configuration
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (for adding auth token if needed)
API.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("authToken") || "9fbc6df30ef1431:6d4f68e133966b7"; // Get token from storage
    if (token) {
      config.headers.Authorization = `token ${token}`; // Attach token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Handle global API responses)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default API;
