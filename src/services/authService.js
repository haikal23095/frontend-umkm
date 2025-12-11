import api from '../api/axios';
import { setAuthToken, setUser, clearAuth } from '../utils/auth';

export const authService = {
    // Login
    async login(email, password) {
        const response = await api.post('/login', {
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
        const response = await api.post('/register', {
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
            await api.post('/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            clearAuth();
        }
    },

    // Get current user
    async getCurrentUser() {
        const response = await api.get('/user');
        if (response.data.success) {
            const user = response.data.data;
            setUser(user);
            return user;
        }
        return null;
    },
};
