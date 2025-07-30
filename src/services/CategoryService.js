import { get, post, put, del } from '~/utils/httpRequest';

const getAllCategory = async () => {
    try {
        const response = await get('categories');
        return response;
    } catch (error) {
        throw error;
    }
};

const getCategoryById = async (id) => {
    try {
        const response = await get(`categories/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const createCategory = async (data) => {
    try {
        const response = await post('categories', data);
        return response;
    } catch (error) {
        throw error;
    }
};

const updateCategoryById = async (id, data) => {
    try {
        const response = await put(`categories/${id}`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

const delCategoryById = async (id) => {
    try {
        const response = await del(`categories/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const getTopCategories = async () => {
    try {
        const response = await get('categories/top-categories');
        return response;
    } catch (error) {
        throw error;
    }
};

const getTopCompanies = async () => {
    try {
        const response = await get('users/top-company');
        return response;
    } catch (error) {
        throw error;
    }
};

const categoryService = {
    getAllCategory,
    getCategoryById,
    createCategory,
    updateCategoryById,
    delCategoryById,
    getTopCategories,
    getTopCompanies,
};

export default categoryService;
