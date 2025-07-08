import { get, post, put, del } from '~/utils/httpRequest';

const listAllJobs = async (page = 1, size = 12) => {
    try {
        const response = await get('job/list?page=' + page + '&size=' + size);
        return response;
    } catch (error) {
        throw error;
    }
};

const getJobById = async (id) => {
    try {
        const response = await get(`job/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};
const createJob = async (data) => {
    try {
        const response = await post('job/create', data);
        return response;
    } catch (error) {
        throw error;
    }
};
const delJobById = async (id) => {
    try {
        const response = await del(`job/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const unSaveJob = async (id) => {
    try {
        const response = await del(`saved-jobs/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const saveJob = async (id) => {
    try {
        const response = await post(`saved-jobs`, { jobId: id });
        return response;
    } catch (error) {
        throw error;
    }
};

const getSavedJob = async (id) => {
    try {
        const response = await get(`save/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const updateJobById = async (id, data) => {
    try {
        const response = await put(`job/${id}`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

const applyJob = async (formData) => {
    try {
        const response = await post(`apply`, formData, {});
        return response;
    } catch (error) {
        throw error;
    }
};

const getAppliedJob = async (id) => {
    try {
        const response = await get(`apply/my-applied-jobs/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const updateApplyStatus = async (id, data) => {
    try {
        const response = await put(`apply/${id}`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

const getAllCandidateAppliedJobId = async (id) => {
    try {
        const response = await get(`candidates/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const getAllOptions = async () => {
    try {
        const response = await get(`options/all`);
        return response;
    } catch (error) {
        throw error;
    }
};

const getTopLatestJobs = async () => {
    try {
        const response = await get('job/latest');
        return response;
    } catch (error) {
        throw error;
    }
};

const trackViewdJob = async (id) => {
    try {
        const response = await post(`job-views/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const searchJob = async (params) => {
    try {
        const response = await get('jobs/search', params);
        return response;
    } catch (error) {
        throw error;
    }
};

const jobService = {
    listAllJobs,
    getJobById,
    createJob,
    delJobById,
    unSaveJob,
    saveJob,
    getSavedJob,
    updateJobById,
    applyJob,
    getAppliedJob,
    updateApplyStatus,
    getAllCandidateAppliedJobId,
    getAllOptions,
    getTopLatestJobs,
    searchJob,
};

export default jobService;
