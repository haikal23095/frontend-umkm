import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import { getUser, isAuthenticated } from "../utils/auth";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      if (isAuthenticated()) {
        const storedUser = getUser();
        setUser(storedUser);

        // Optionally refresh user data from API
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error("Failed to fetch current user:", error);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const result = await authService.login(email, password);
      if (result.success) {
        setUser(result.user);
        toast.success("Login berhasil!");
        return { success: true, user: result.user };
      }
      toast.error(result.message || "Login gagal");
      return { success: false };
    } catch (error) {
      const message =
        error.response?.data?.message || "Terjadi kesalahan saat login";
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const register = async (name, email, password, password_confirmation) => {
    try {
      const result = await authService.register(
        name,
        email,
        password,
        password_confirmation
      );
      if (result.success) {
        setUser(result.user);
        toast.success("Registrasi berhasil!");
        return { success: true, user: result.user };
      }
      toast.error(result.message || "Registrasi gagal");
      return { success: false };
    } catch (error) {
      const message =
        error.response?.data?.message || "Terjadi kesalahan saat registrasi";
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      toast.success("Logout berhasil!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Terjadi kesalahan saat logout");
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAdmin: user?.peran === "admin",
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
