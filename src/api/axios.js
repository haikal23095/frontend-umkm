import axios from 'axios';

// Ganti URL ini sesuai IP Load Balancer atau localhost saat dev
// Saat development lokal: 'http://localhost:8000/api'
// Saat production nanti: '/api' (karena satu domain di Node 3)
const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Interceptor: Setiap request otomatis selipkan Token jika ada
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;