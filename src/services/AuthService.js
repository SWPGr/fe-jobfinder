import { post } from '~/utils/httpRequest';

const login = async (email, password) => {
    try {
        const response = await post('auth/login', { email, password }); // gửi trong body
        return response;
    } catch (error) {
        throw error;
    }
};

const register = async (email, password, roleName) => {
    try {
        const response = await post('auth/register', { email, password, roleName }); // gửi trong body
        return response;
    } catch (error) {
        throw error;
    }
};

const forgotPassword = async (email) => {
    try {
        const response = await post('auth/forgot-password', { email }); // gửi trong body
        return response;
    } catch (error) {
        throw error;
    }
};

const resetPassword = async (token, password) => {
    try {
        const response = await post('auth/reset-password', { token, password }); // gửi trong body
        return response;
    } catch (error) {
        throw error;
    }
};

const googleLogin = async (email) => {
    try {
        const response = await post('oauth2/authorization/google', { email }); // gửi trong body
        return response;
    } catch (error) {
        throw error;
    }
};

const AuthService = {
    login,
    register,
    forgotPassword,
    resetPassword,
    googleLogin,
};

export default AuthService;
