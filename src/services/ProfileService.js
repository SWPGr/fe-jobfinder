import { get, put, post } from '~/utils/httpRequest';

// Get profile data
const getProfile = async () => {
    try {
        const response = await get('/profiles/me');
        // API trả về array, lấy phần tử đầu tiên
        return Array.isArray(response) ? response[0] : response;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
};

// Update profile data with FormData support
const updateProfile = async (profileData) => {
    try {
        const response = await put('/profiles', profileData);
        return response;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};

// Update profile with file upload (FormData)
const updateProfileWithFile = async (formData) => {
    return await put('/profiles', formData);
};

// Change password
const changePassword = async (oldPassword, newPassword) => {
    try {
        const response = await post('/auth/change-password', {
            oldPassword: oldPassword,
            newPassword: newPassword
        });
        return response;
    } catch (error) {
        console.error('Error changing password:', error);
        throw error;
    }
};

const ProfileService = {
    getProfile,
    updateProfile,
    updateProfileWithFile,
    changePassword,
};

export default ProfileService;
