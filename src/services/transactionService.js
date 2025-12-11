import api from '../api/axios';

export const transactionService = {
    // Get all transactions
    async getAllTransactions() {
        const response = await api.get('/transaksi');
        return response.data;
    },

    // Get transactions by user
    async getTransactionsByUser(userId) {
        const response = await api.get(`/transaksi?user_id=${userId}`);
        return response.data;
    },

    // Get single transaction
    async getTransaction(id) {
        const response = await api.get(`/transaksi/${id}`);
        return response.data;
    },

    // Create transaction with details
    async createTransaction(transactionData) {
        const response = await api.post('/transaksi', transactionData);
        return response.data;
    },

    // Update transaction
    async updateTransaction(id, transactionData) {
        const response = await api.put(`/transaksi/${id}`, transactionData);
        return response.data;
    },

    // Delete transaction
    async deleteTransaction(id) {
        const response = await api.delete(`/transaksi/${id}`);
        return response.data;
    },
};
