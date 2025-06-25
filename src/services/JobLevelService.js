import { post, get, put, del } from '~/utils/httpRequest';
const getAllJobLevel = async () => {
    try {
        const response = await get('job-levels');
        return response;
    } catch (error) {
        throw error;
    }
};

const getJobLevelById = async (id) => {
    try {
        const response = await get(`job-levels/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const createJobLevel = async (data) => {
    try {
        const response = await post('job-types', data);
        return response;
    } catch (error) {
        throw error;
    }
};

const deleteJobLevelById = async (id) => {
    try {
        const response = await del(`job-types/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const updateJobLevelById = async (id, data) => {
    try {
        const response = await put(`job-types/${id}`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

const jobLevelService = {
    getAllJobLevel,
    getJobLevelById,
    createJobLevel,
    deleteJobLevelById,
    updateJobLevelById,
};

export default jobLevelService;
