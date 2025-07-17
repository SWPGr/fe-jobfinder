import { get, del } from '~/utils/httpRequest';

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

const searchHistory = async () => {
    try {
        const response = await get('search-history/my');
        return response;
    } catch (error) {
        throw error;
    }
};

const deleteSearchHistory = async (id) => {
    try {
        const response = await del(`search-history/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const deleteAllSearchHistory = async () => {
    try {
        const response = await del('search-history/my');
        return response;
    } catch (error) {
        throw error;
    }
};

const searchService = {
    searchEmployer,
    searchCandidate,
    searchHistory,
    deleteSearchHistory,
    deleteAllSearchHistory,
};

export default searchService;
