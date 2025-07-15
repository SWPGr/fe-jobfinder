import { get } from '~/utils/httpRequest';

const searchEmployer = async (params) => {
    try {
        const response = await get('employers/search', params);
        return response;
    } catch (error) {
        throw error;
    }
};

const searchService = {
    searchEmployer,
};

export default searchService;
