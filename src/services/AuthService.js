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
const AuthService = {
    login,
    register,
};

export default AuthService;
