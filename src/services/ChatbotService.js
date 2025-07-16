import { get, post } from '~/utils/httpRequest';

const sendMessage = async (data) => {
    try {
        const response = await post('chatbot/message', data);
        return response;
    } catch (error) {
        throw error;
    }
};

const getMessageHistory = async () => {
    try {
        const response = await get('chatbot/my-history');
        return response;
    } catch (error) {
        throw error;
    }
};

const chatbotService = {
    sendMessage,
    getMessageHistory,
};

export default chatbotService;
