import axios from 'axios';

// trong interceptor

const httpRequest = axios.create({
    //loại bỏ cố định content-type: application/json để làm mô hình request nâng cao
    baseURL: process.env.REACT_APP_API_BASE_URL, // đặt baseURL nếu có
    timeout: 10000, // timeout 10s (tuỳ chọn)
});
// Middleware có thể thêm: interceptors request/response nếu muốn
httpRequest.interceptors.response.use(
    (response) => response, // Trả về response nếu thành công
    (error) => {
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        console.log('Error:', errorMessage);

        if (error.response) {
            switch (error.response.status) {
                case 401:
                    localStorage.removeItem('user');
                    console.log('Session expired. Please log in again.');
                    window.location.href = '/login?error=session-expired'; // Chuyển hướng về login
                    return Promise.reject(
                        new Error({
                            code: 401,
                            message: 'Session expired. Please log in again.',
                        }),
                    );
                case 403:
                    return Promise.reject(new Error('You do not have permission to perform this action.'));
                case 429:
                    return Promise.reject(new Error('Too many requests. Please try again later.'));
                default:
                    return Promise.reject(errorMessage);
            }
        } else if (error.code === 'ECONNABORTED') {
            return Promise.reject(new Error('Request timed out. Please try again.'));
        } else if (!error.response) {
            return Promise.reject(new Error('Network error. Please check your connection.'));
        }

        return Promise.reject(errorMessage);
    },
);

httpRequest.interceptors.request.use(
    (config) => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const user = JSON.parse(storedUser);
                if (user?.token) {
                    config.headers.Authorization = `Bearer ${user.token}`;
                }
            }

        } catch (error) {
            console.warn('Failed to parse user data from localStorage:', error);
        }
        return config;
    },
    (error) => Promise.reject(error),
);
// Xử lý GET
export const get = async (path, params = {}, options = {}) => {
    try {
        const response = await httpRequest.get(
            path,
            {
                params: {
                    ...params,
                },
            },
            options,
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Xử lý POST
export const post = async (path, data = {}, options = {}) => {
    try {
        const response = await httpRequest.post(path, data, options);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Xử lý PUT
export const put = async (path, data = {}, options = {}) => {
    try {
        const response = await httpRequest.put(path, data, options);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Xử lý DELETE
export const del = async (path, options = {}) => {
    try {
        const response = await httpRequest.delete(path, options);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default httpRequest;
