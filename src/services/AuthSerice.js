import { post } from '~/utils/httpRequest';

const login = async (username, password) => {
    try {
        const response = await post('/login', { username, password }); // gửi trong body
        return response;
    } catch (error) {
        throw error;
    }
};

const register = async (username, password, role) => {
    try {
        const response = await post('/register', { username, password, role }); // gửi trong body
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
