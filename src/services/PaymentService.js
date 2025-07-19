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

const getAllPayments = async (userId) => {
    try {
        const response = await get(`payments/my-history`);
        return response;
    } catch (error) {
        throw error;
    }
};

const paymentService = {
    getAllSubscriptionPlans,
    getSubscriptionPlanById,
    createPayment,
    getAllPaymentForAdmin,
    getAllPayments,
};

export default paymentService;
