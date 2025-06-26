import { get, post, put, del } from '~/utils/httpRequest';

export const getAllEducation = async () => {
    try {
        const response = await get('educations');
        return response;
    } catch (error) {
        throw error;
    }
};
export const createEducation = async (data) => {
    try {
        const response = await post('educations', data);
        return response;
    } catch (error) {
        throw error;
    }
};

//Not used
export const getEducationById = async (id) => {
    try {
        const response = await get(`educations/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateEducationById = async (id, data) => {
    try {
        const response = await put(`educations/${id}`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteEducationById = async (id) => {
    try {
        const response = await del(`educations/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const EducationService = {
    getAllEducation,
    getEducationById,
    createEducation,
    updateEducationById,
    deleteEducationById,
};
export default EducationService;
