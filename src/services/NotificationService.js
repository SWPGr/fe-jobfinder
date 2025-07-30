import { get, del, put } from '~/utils/httpRequest';

const getAllNotifications = async () => {
    try {
        const response = await get('notifications');
        return response;
    } catch (error) {
        throw error;
    }
};

const getAllNotificationsById = async (id) => {
    try {
        const response = await get(`notifications/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const getSavedJobNotifications = async () => {
    try {
        const response = await get('notifications/get-saved-job');
        return response;
    } catch (error) {
        throw error;
    }
};

const deleteNotification = async (notificationId) => {
    try {
        const response = await del(`notifications/${notificationId}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const clearAllNotifications = async () => {
    try {
        const response = await del('notifications/clear-all');
        return response;
    } catch (error) {
        throw error;
    }
};

const markNotificationAsRead = async (notificationId) => {
    try {
        const response = await put(`notifications/${notificationId}/read`);
        return response;
    } catch (error) {
        throw error;
    }
};

const notificationService = {
    getAllNotifications,
    getAllNotificationsById,
    getSavedJobNotifications,
    deleteNotification,
    clearAllNotifications,
    markNotificationAsRead,
};

export default notificationService;
