import { get, put } from '~/utils/httpRequest';

const updateProfileWithFile = async (formData) => {
    return await put('/profiles', formData, { headers: {} });
};

const getProfile = async () => {
    try {
        const response = await get('/profiles/me', {});
        return response;
    } catch (error) {
        throw error;
    }
};

const getSocialMediaLinksByUserId = async (userId) => {
    try {
        const res = await fetch(`http://localhost:8080/api/social-media-links/user/${userId}`);
        const data = await res.json();
        return data || [];
    } catch (err) {
        console.error('Error fetching social media links:', err);
        return [];
    }
};

// Lấy social links của user hiện tại
const getMySocialLinks = async () => {
    try {
        return await get('/user-social-links/my');
    } catch (err) {
        console.error('Error fetching my social links:', err);
        return [];
    }
};
// Lấy danh sách social types
const getSocialTypes = async () => {
    try {
        const res = await get('/social-types');
        return res.result || [];
    } catch (err) {
        console.error('Error fetching social types:', err);
        return [];
    }
};

const JobSeekerProfileService = {
    updateProfileWithFile,
    getProfile,
    getSocialMediaLinksByUserId,
    getSocialTypes,
    getMySocialLinks,
};

export default JobSeekerProfileService;
