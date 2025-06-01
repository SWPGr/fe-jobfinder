import { createContext, useState, useContext } from 'react';
import { authService } from '~/services';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    let [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Hàm chung xử lý đăng nhập và đăng ký
    const authenticate = async (type, username, password, role) => {
        setLoading(true);
        setError(null);
        try {
            let response;
            if (type === 'login') {
                response = await authService.login(username, password);
            } else if (type === 'register') {
                response = await authService.register(username, password, role);
            }
            const data = response.data;
            const loggedInUser = { ...data.user, token: data.token };
            setUser(loggedInUser);
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            setLoading(false);
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            setError(errorMessage);
            setLoading(false);
            return { success: false, message: errorMessage };
        }
    };
    const loginWithGoogle = async (token, role) => {
        setLoading(true);
        setError(null);
        try {
            // Giả sử authService có api googleLogin nhận token và role
            const response = await authService.googleLogin(token, role);
            const data = response.data;
            const loggedInUser = { ...data.user, token: data.token };
            setUser(loggedInUser);
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            setLoading(false);
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            setError(errorMessage);
            setLoading(false);
            return { success: false, message: errorMessage };
        }
    };

    // Giao diện hàm login và register gọi chung hàm authenticate
    const login = (username, password) => authenticate('login', username, password);
    const register = (username, password, role) => authenticate('register', username, password, role);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    user = {
        role: 'JOB_SEEKER',
    };
    // user = null;

    return (
        <AuthContext.Provider value={{ user, login, register, loginWithGoogle, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
