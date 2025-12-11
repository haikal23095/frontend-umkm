import { axiosInstance, API_ENDPOINTS } from '../config/api';
import { setAuthToken, setUser, clearAuth } from '../utils/auth';

export const authService = {
    // Login
    async login(email, password) {
        const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, {
            email,
            password,
        });

        if (response.data.success) {
            const { token, user } = response.data.data;
            setAuthToken(token);
            setUser(user);
            return { success: true, user };
        }

        return { success: false, message: response.data.message };
    },

    // Register
    async register(name, email, password, password_confirmation) {
        const response = await axiosInstance.post(API_ENDPOINTS.REGISTER, {
            name,
            email,
            password,
            password_confirmation,
        });

        if (response.data.success) {
            const { token, user } = response.data.data;
            setAuthToken(token);
            setUser(user);
            return { success: true, user };
        }

        return { success: false, message: response.data.message };
    },

    // Logout
    async logout() {
        try {
            await axiosInstance.post(API_ENDPOINTS.LOGOUT);
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            clearAuth();
        }
    },

    // Get current user
    async getCurrentUser() {
        const response = await axiosInstance.get(API_ENDPOINTS.GET_USER);
        if (response.data.success) {
            const user = response.data.data;
            setUser(user);
            return user;
        }
        return null;
    },
};
