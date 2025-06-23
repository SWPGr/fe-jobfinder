import { get } from '~/utils/httpRequest';

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

const notificationService = {
    getAllNotifications,
    getAllNotificationsById,
};

export default notificationService;
