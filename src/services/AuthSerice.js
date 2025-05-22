import { httpRequest } from '~/utils';

const getUser = async (username, password) => {
    const response = await httpRequest.get('/api/user', {
        params: {
            username,
            password,
        },
    });
    return response.data;
};

const AuthService = {
    getUser,
};
export default AuthService;
