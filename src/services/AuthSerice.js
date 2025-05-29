import { httpRequest } from '~/utils';

const postUser = async (username, password) => {
    const response = await httpRequest.post('/login', {
        params: {
            username,
            password,
        },
    });
    return response.data;
};

const AuthService = {
    postUser,
};
export default AuthService;
