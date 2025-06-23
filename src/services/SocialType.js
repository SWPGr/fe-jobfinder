import { post, get, put, del } from '~/utils/httpRequest';

export const getAllSocialType = async () => {
    try {
        const response = await get('social-types');
        return response;
    } catch (error) {
        throw error;
    }
};

export const createSocialType = async (data) => {
    try {
        const response = await post('social-types', data);
        return response;
    } catch (error) {
        throw error;
    }
};

//Not used
export const updateSocialTypeById = async (id, data) => {
    try {
        const response = await put(`social-types/${id}`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteSocialTypeById = async (id) => {
    try {
        const response = await del(`user-social-links/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getSocialTypeById = async (id) => {
    try {
        const response = await get(`social-types/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const socialTypeService = {
    getAllSocialType,
    createSocialType,
    updateSocialTypeById,
    deleteSocialTypeById,
    getSocialTypeById,
};

export default socialTypeService;
