import axios from "axios";

const BASE_URL = "https://lms-learning-backend1.onrender.com/api/v1";

// const BASE_URL = "http://localhost:5000/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    return Promise.reject(error);
  }
);

export default axiosInstance;
