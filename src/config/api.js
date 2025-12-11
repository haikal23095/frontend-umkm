import axios from 'axios';

// Base URL API Laravel
export const API_BASE_URL = 'http://localhost:8000/api';

// Axios instance dengan konfigurasi default
export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request interceptor untuk menambahkan token
axiosInstance.interceptors.request.use(
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

// Response interceptor untuk handle error
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired atau invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// API Endpoints
export const API_ENDPOINTS = {
    // Auth
    LOGIN: '/login',
    REGISTER: '/register',
    LOGOUT: '/logout',
    GET_USER: '/user',

    // Products
    PRODUCTS: '/produk',
    PRODUCT_DETAIL: (id) => `/produk/${id}`,

    // Users
    USERS: '/users',
    USER_DETAIL: (id) => `/users/${id}`,

    // Transactions
    TRANSACTIONS: '/transaksi',
    TRANSACTION_DETAIL: (id) => `/transaksi/${id}`,
    TRANSACTION_BY_USER: (userId) => `/transaksi?user_id=${userId}`,

    // Transaction Details
    DETAIL_TRANSACTIONS: '/detail-transaksi',
    DETAIL_BY_TRANSACTION: (transaksiId) => `/transaksi/${transaksiId}/details`,

    // Payments
    PAYMENTS: '/pembayaran',
    PAYMENT_DETAIL: (id) => `/pembayaran/${id}`,
    PAYMENT_BY_TRANSACTION: (transaksiId) => `/pembayaran?id_transaksi=${transaksiId}`,
};
