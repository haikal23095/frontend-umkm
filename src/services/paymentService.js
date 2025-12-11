import api from '../api/axios';

export const paymentService = {
    // Get all payments
    async getAllPayments() {
        const response = await api.get('/pembayaran');
        return response.data;
    },

    // Get payment by transaction
    async getPaymentByTransaction(transaksiId) {
        const response = await api.get(`/pembayaran?id_transaksi=${transaksiId}`);
        return response.data;
    },

    // Get single payment
    async getPayment(id) {
        const response = await api.get(`/pembayaran/${id}`);
        return response.data;
    },

    // Create payment
    async createPayment(paymentData) {
        const response = await api.post('/pembayaran', paymentData);
        return response.data;
    },

    // Update payment
    async updatePayment(id, paymentData) {
        const response = await api.put(`/pembayaran/${id}`, paymentData);
        return response.data;
    },

    // Delete payment
    async deletePayment(id) {
        const response = await api.delete(`/pembayaran/${id}`);
        return response.data;
    },
};
