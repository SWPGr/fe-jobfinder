import { get, put, post, del } from '~/utils/httpRequest';

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

const getSocialMediaLinksByUserId = async (userId) => {
    try {
        const res = await fetch(`social-media-links/user/${userId}`);
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

// Tạo mới social link
const createSocialLink = async (socialTypeId, url) => {
    try {
        const response = await post('/user-social-links', {
            socialTypeId: socialTypeId,
            url: url
        });
        return response;
    } catch (err) {
        // Error từ httpRequest đã có code và message từ backend
        throw err;
    }
};

// Cập nhật social link theo ID của social link
const updateSocialLink = async (socialLinkId, socialTypeId, url) => {
    try {
        const response = await put(`/user-social-links/${socialLinkId}`, {
            socialTypeId: socialTypeId,
            url: url
        });
        return response;
    } catch (err) {
        // Error từ httpRequest đã có code và message từ backend
        throw err;
    }
};

// Xóa social link theo ID của social link
const deleteSocialLink = async (socialLinkId) => {
    try {
        const response = await del(`/user-social-links/${socialLinkId}`);
        return response;
    } catch (err) {
        // Error từ httpRequest đã có code và message từ backend
        throw err;
    }
};

// Thay đổi mật khẩu
const changePassword = async (oldPassword, newPassword) => {
    try {
        const response = await post('/auth/change-password', {
            oldPassword: oldPassword,
            newPassword: newPassword
        });
        return response;
    } catch (err) {
        // Error từ httpRequest đã có code và message từ backend
        throw err;
    }
};

const getUserById = async (userId) => {
    try {
        const response = await get(`/users/${userId}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const JobSeekerProfileService = {
    updateProfileWithFile,
    getProfile,
    getSocialMediaLinksByUserId,
    getSocialTypes,
    getMySocialLinks,
    createSocialLink,
    updateSocialLink,
    deleteSocialLink,
    changePassword,
    getUserById
};

export default JobSeekerProfileService;
