import axios from 'axios';

// axios instance including JWT token
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://newsletter-backend-5234.onrender.com' 
    : 'http://localhost:5000',
});

// add JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;