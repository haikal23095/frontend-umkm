import api from '../api/axios';

export const productService = {
    // Get all products
    async getAllProducts() {
        const response = await api.get('/produk');
        return response.data;
    },

    // Get single product
    async getProduct(id) {
        const response = await api.get(`/produk/${id}`);
        return response.data;
    },

    // Create product (admin only)
    async createProduct(productData) {
        const response = await api.post('/produk', productData);
        return response.data;
    },

    // Update product (admin only)
    async updateProduct(id, productData) {
        const response = await api.put(`/produk/${id}`, productData);
        return response.data;
    },

    // Delete product (admin only)
    async deleteProduct(id) {
        const response = await api.delete(`/produk/${id}`);
        return response.data;
    },
};
