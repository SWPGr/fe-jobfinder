import { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '~/services';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Load user from localStorage on initialization
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (username, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.getUser(username, password); // Axios call
            // Axios automatically parses JSON, so you can directly access response.data
            const data = response.data;

            // Assuming API returns { user: {}, token: '' }
            const loggedInUser = { ...data.user, token: data.token };
            setUser(loggedInUser);
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            setLoading(false);
            return { success: true };
        } catch (error) {
            // Axios errors can be accessed via error.response
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            setError(errorMessage);
            setLoading(false);
            return { success: false, message: errorMessage };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return <AuthContext.Provider value={{ user, login, logout, loading, error }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
