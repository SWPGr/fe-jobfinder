import { get, put, post } from '~/utils/httpRequest';

const updateProfileWithFile = async (formData) => {
    return await put('/profiles', formData, { headers: {} });
};

const getProfile = async () => {
    try {
        const response = await get('/profiles/me', {}); // Updated to /profile/me
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
