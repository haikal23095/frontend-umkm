import { axiosInstance, API_ENDPOINTS } from '../config/api';

export const productService = {
    // Get all products
    async getAllProducts() {
        const response = await axiosInstance.get(API_ENDPOINTS.PRODUCTS);
        return response.data;
    },

    // Get single product
    async getProduct(id) {
        const response = await axiosInstance.get(API_ENDPOINTS.PRODUCT_DETAIL(id));
        return response.data;
    },

    // Create product (admin only)
    async createProduct(productData) {
        const response = await axiosInstance.post(API_ENDPOINTS.PRODUCTS, productData);
        return response.data;
    },

    // Update product (admin only)
    async updateProduct(id, productData) {
        const response = await axiosInstance.put(API_ENDPOINTS.PRODUCT_DETAIL(id), productData);
        return response.data;
    },

    // Delete product (admin only)
    async deleteProduct(id) {
        const response = await axiosInstance.delete(API_ENDPOINTS.PRODUCT_DETAIL(id));
        return response.data;
    },
};
