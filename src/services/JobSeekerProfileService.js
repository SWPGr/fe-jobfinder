import { get, put } from '~/utils/httpRequest';

const updateProfileWithFile = async (formData) => {
    return await put('/profiles', formData, { headers: {} });
};

const getProfile = async () => {
    try {
        const response = await get('/profiles'); // Thay '/profiles' bằng endpoint thực tế (ví dụ: '/profile')
        return response;
    } catch (error) {
        throw error; // Ném lỗi để interceptor xử lý
    }
};

const JobSeekerProfileService = {
    updateProfileWithFile,
    getProfile,
};

export default JobSeekerProfileService;
