import { post, get, put } from '~/utils/httpRequest';

export const getAllJobType = async () => {
    try {
        const response = await get('job-types');
        return response;
    } catch (error) {
        throw error;
    }
};

export const createJobType = async (data) => {
    try {
        const response = await post('job-types', data);
        return response;
    } catch (error) {
        throw error;
    }
};

//Not used
export const getJobTypeById = async (id) => {
    try {
        const response = await get(`job-types/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateJobTypeById = async (id, data) => {
    try {
        const response = await put(`job-types/${id}`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

const jobTypeService = {
    getAllJobType,
    createJobType,
    getJobTypeById,
    updateJobTypeById,
};
export default jobTypeService;
