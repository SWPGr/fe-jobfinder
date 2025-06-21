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
    const authenticate = async (type, email, password, roleName) => {
        setLoading(true);
        setError(null);
        try {
            let response;
            if (type === 'login') {
                response = await authService.login(email, password);
            } else if (type === 'register') {
                response = await authService.register(email, password, roleName);
            }
            const data = response.result;
            const loggedInUser = { role: data.role, token: data.token };
            setUser(loggedInUser);
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            setLoading(false);
            return { success: true, data: data };
        } catch (error) {
            console.log(error);
            setError(error);
            setLoading(false);
            return { success: false, message: error };
        }
    };
    const loginWithGoogle = async (email) => {
        setLoading(true);
        setError(null);
        try {
            // Giả sử authService có api googleLogin nhận token và role
            const response = await authService.googleLogin(email);
            const data = response;
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
    const login = (email, password) => authenticate('login', email, password);
    const register = (email, password, roleName) => authenticate('register', email, password, roleName);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    //  user = {
    //      //role: 'ADMIN',
    //      //role: 'JOB_SEEKER',
    //      role: 'EMPLOYER',
    //  };

    return (
        <AuthContext.Provider value={{ user, login, register, loginWithGoogle, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
