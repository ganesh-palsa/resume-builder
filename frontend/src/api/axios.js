import axios from 'axios';

// Create an axios instance with a default base URL
// We use a placeholder local URL as requested
const api = axios.create({
  baseURL: 'https://resume-builder-c8eg.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor for tokens if required
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
