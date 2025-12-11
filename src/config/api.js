import api from '../api/axios';

// Export axios instance yang sudah ada
export const axiosInstance = api;

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
