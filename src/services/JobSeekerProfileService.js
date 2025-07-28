import { get, put } from '~/utils/httpRequest';

const updateProfileWithFile = async (formData) => {
    return await put('/profiles', formData);
};

const getProfile = async () => {
    try {
        const response = await get('/profiles/me', {});
        return response;
    } catch (error) {
        throw error;
    }
};

const JobSeekerProfileService = {
    updateProfileWithFile,
    getProfile,
};

export default JobSeekerProfileService;
