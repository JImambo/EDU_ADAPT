// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  // CORRECTION : Utiliser import.meta.env et le préfixe VITE_ pour Vite
  baseURL: import.meta.env.VITE_API_URL || '/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;