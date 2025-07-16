import { get } from '~/utils/httpRequest';

const searchEmployer = async (params) => {
    try {
        const response = await get('employers/search', params);
        return response;
    } catch (error) {
        throw error;
    }
};

const searchCandidate = async (params) => {
    try {
        const response = await get('job-seekers/search', params);
        return response;
    } catch (error) {
        throw error;
    }
};

const searchService = {
    searchEmployer,
    searchCandidate,
};

export default searchService;
