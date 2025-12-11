import { axiosInstance, API_ENDPOINTS } from '../config/api';

export const paymentService = {
    // Get all payments
    async getAllPayments() {
        const response = await axiosInstance.get(API_ENDPOINTS.PAYMENTS);
        return response.data;
    },

    // Get payment by transaction
    async getPaymentByTransaction(transaksiId) {
        const response = await axiosInstance.get(API_ENDPOINTS.PAYMENT_BY_TRANSACTION(transaksiId));
        return response.data;
    },

    // Get single payment
    async getPayment(id) {
        const response = await axiosInstance.get(API_ENDPOINTS.PAYMENT_DETAIL(id));
        return response.data;
    },

    // Create payment
    async createPayment(paymentData) {
        const response = await axiosInstance.post(API_ENDPOINTS.PAYMENTS, paymentData);
        return response.data;
    },

    // Update payment
    async updatePayment(id, paymentData) {
        const response = await axiosInstance.put(API_ENDPOINTS.PAYMENT_DETAIL(id), paymentData);
        return response.data;
    },

    // Delete payment
    async deletePayment(id) {
        const response = await axiosInstance.delete(API_ENDPOINTS.PAYMENT_DETAIL(id));
        return response.data;
    },
};
