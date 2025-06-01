import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || '', // đặt baseURL nếu có
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // timeout 10s (tuỳ chọn)
});

// Middleware có thể thêm: interceptors request/response nếu muốn

// Xử lý GET
export const get = async (path, options = {}) => {
    try {
        const response = await httpRequest.get(path, options);
        return response.data;
    } catch (error) {
        // Có thể xử lý lỗi ở đây hoặc throw lên trên
        throw error.response?.data || error.message;
    }
};

// Xử lý POST
export const post = async (path, data = {}, options = {}) => {
    try {
        const response = await httpRequest.post(path, data, options);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Xử lý PUT
export const put = async (path, data = {}, options = {}) => {
    try {
        const response = await httpRequest.put(path, data, options);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Xử lý DELETE
export const del = async (path, options = {}) => {
    try {
        const response = await httpRequest.delete(path, options);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export default httpRequest;
