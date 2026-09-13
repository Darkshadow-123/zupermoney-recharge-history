import axios from 'axios';

// Single axios instance so base URL / headers only need to be configured once.
// VITE_API_BASE_URL falls back to localhost:8000 for local dev if no .env is set.
const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    Accept: 'application/json',
  },
});

export default client;
