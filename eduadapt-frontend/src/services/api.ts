import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api', // Utilise les routes API de Next.js
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;