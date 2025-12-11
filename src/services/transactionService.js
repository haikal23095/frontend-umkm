import { axiosInstance, API_ENDPOINTS } from '../config/api';

export const transactionService = {
    // Get all transactions
    async getAllTransactions() {
        const response = await axiosInstance.get(API_ENDPOINTS.TRANSACTIONS);
        return response.data;
    },

    // Get transactions by user
    async getTransactionsByUser(userId) {
        const response = await axiosInstance.get(API_ENDPOINTS.TRANSACTION_BY_USER(userId));
        return response.data;
    },

    // Get single transaction
    async getTransaction(id) {
        const response = await axiosInstance.get(API_ENDPOINTS.TRANSACTION_DETAIL(id));
        return response.data;
    },

    // Create transaction with details
    async createTransaction(transactionData) {
        const response = await axiosInstance.post(API_ENDPOINTS.TRANSACTIONS, transactionData);
        return response.data;
    },

    // Update transaction
    async updateTransaction(id, transactionData) {
        const response = await axiosInstance.put(API_ENDPOINTS.TRANSACTION_DETAIL(id), transactionData);
        return response.data;
    },

    // Delete transaction
    async deleteTransaction(id) {
        const response = await axiosInstance.delete(API_ENDPOINTS.TRANSACTION_DETAIL(id));
        return response.data;
    },
};
