import { put } from '~/utils/httpRequest';

const updateProfileWithFile = async (formData) => {
    return await put('/profiles', formData, { headers: {} });
};

const JobSeekerProfileService = {
    updateProfileWithFile,
};

export default JobSeekerProfileService;
