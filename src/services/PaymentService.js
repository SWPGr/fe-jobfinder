import { get, post } from '~/utils/httpRequest';

const getAllSubscriptionPlans = async () => {
    try {
        const response = await get('subscription-plans/by-role');
        return response;
    } catch (error) {
        throw error;
    }
};

const getSubscriptionPlanById = async (planId) => {
    try {
        const response = await get(`subscription-plans/${planId}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const createPayment = async (paymentData) => {
    try {
        const response = await post('payos/create-premium-payment-link', paymentData);
        return response;
    } catch (error) {
        throw error;
    }
};

const getAllPaymentForAdmin = async () => {
    try {
        const response = await get('payments');
        return response;
    } catch (error) {
        throw error;
    }
};

const getAllPayments = async (params) => {
    try {
        const response = await get(`payments/my-history`, params);
        return response;
    } catch (error) {
        throw error;
    }
};

const confirmPaymentSuccess = async (data) => {
    try {
        const orderCode = data;
        await post('payos/process-frontend-success', { orderCode });
        return true;
    } catch (error) {
        console.error("Error details:", {
            message: error.message,
            status: error.response?.status,
            responseData: error.response?.data,
        });
        throw new Error(error.response?.data?.message || 'Unknown error');
    }

}

const paymentService = {
    getAllSubscriptionPlans,
    getSubscriptionPlanById,
    createPayment,
    getAllPaymentForAdmin,
    getAllPayments,
    confirmPaymentSuccess
};

export default paymentService;
