// /src/services/statisticsService.js
import { get, put } from '~/utils/httpRequest';

const fetchAllEmployers = async () => {
    const data = await get('/users/employers');
    return data.result || [];
};
// export const fetchAllJobs = async () => {
//     try {
//         const res = await get('/admin/list-job');
//         console.log('Raw response:', res); // ✅ đã là mảng
//         return res; // 👉 trả về trực tiếp mảng
//     } catch (error) {
//         console.error('Failed to fetch jobs:', error);
//         return [];
//     }
// };

const fetchMonthOverMonthComparison = async () => {
    const data = await get(
        '/statistics/month-over-month-comparison',
        {},

    );
    return data.result || null;
};
const fetchApplicationsTrend = async () => {
    const data = await get('/statistics/last-3-months-applications');
    return data.result || [];
};
const fetchAllJobSeekers = async (name) => {
    // Construct the URL with the search query 'name'

    const url = `/users/jobseekers?name=${encodeURIComponent(name)}`;

    // Make the API request
    const data = await get(url);

    // Return the data from the API
    return data.result || [];
};

export const fetchTotalJobs = async () => {
    const data = await get('/job/total');
    return data.result;
};

const fetchTotalAppliedJobs = async () => {
    const data = await get('/apply/total');
    return data.result || [];
};
const fetchDailyTrends = async () => {
    const data = await get('/statistics/calculated-daily-trends');
    return data.result || [];
};

const fetchJobCategories = async () => {
    const data = await get('/statistics/total-job-posts-by-category');
    return data.result || [];
};

// Fetch all jobs for management with pagination
export const fetchAllJobsForManagement = async (params = {}) => {
    try {
        const query = Object.keys(params)
            .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');
        const url = '/admin/list-job' + (query ? `?${query}` : '');
        const response = await get(url);
        return response;
    } catch (error) {
        console.error('Failed to fetch jobs for management:', error);
        throw error;
    }
};

// Hàm mới để block employer (cập nhật trạng thái)
export const blockEmployer = async (employerId) => {
    try {
        const response = await put(
            '/users/status',
            {
                userId: employerId, // Sử dụng userId (dựa trên logic backend)
                isActive: false, // Thay active bằng isActive để khớp với UserStatusUpdateRequest
            },

        );
        console.log('Block response:', response);
        return response;
    } catch (error) {
        console.error('Failed to block employer:', {
            message: error.message,
            response: error.response ? error.response.data : 'No response data',
        });
        throw error;
    }
};

export const blockJobSeeker = async (jobSeekerId) => {
    try {
        const response = await put(
            '/users/status',
            {
                userId: jobSeekerId, // Sử dụng userId (dựa trên logic backend)
                isActive: false, // Thay active bằng isActive để khớp với UserStatusUpdateRequest
            },

        );
        console.log('Block response:', response);
        return response;
    } catch (error) {
        console.error('Failed to block jobseeker:', {
            message: error.message,
            response: error.response ? error.response.data : 'No response data',
        });
        throw error;
    }
};
export const blockJob = async (jobId) => {
    try {
        const response = await put(
            '/job/status',
            {
                jobId: jobId,
                isActive: false,
            },

        );
        console.log('Block response:', response);
        return response;
    } catch (error) {
        console.error('Failed to block Job:', {
            message: error.message,
            response: error.response ? error.response.data : 'No response data',
        });
        throw error;
    }
};

export const unblockJobSeeker = async (jobSeekerId) => {
    try {
        const response = await put(
            '/users/status',
            {
                userId: jobSeekerId,
                isActive: true,
            },
        );
        console.log('Unblock response:', response);
        return response;
    } catch (error) {
        console.error('Failed to unblock jobseeker:', {
            message: error.message,
            response: error.response ? error.response.data : 'No response data',
        });
        throw error;
    }
};

export const unblockEmployer = async (employerId) => {
    try {
        const response = await put(
            '/users/status',
            {
                userId: employerId,
                isActive: true,
            },
        );
        console.log('Unblock employer response:', response);
        return response;
    } catch (error) {
        console.error('Failed to unblock employer:', {
            message: error.message,
            response: error.response ? error.response.data : 'No response data',
        });
        throw error;
    }
};

export const unblockJob = async (jobId) => {
    try {
        const response = await put(
            '/job/status',
            {
                jobId: jobId,
                isActive: true,
            },
        );
        console.log('Unblock job response:', response);
        return response;
    } catch (error) {
        console.error('Failed to unblock Job:', {
            message: error.message,
            response: error.response ? error.response.data : 'No response data',
        });
        throw error;
    }
};

// Lấy danh sách payment (có phân trang và filter)
export const fetchAllPayments = async (params = {}) => {
    try {
        // Map params to query string
        const query = Object.keys(params)
            .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');
        const url = '/payments' + (query ? `?${query}` : '');
        const res = await get(url);
        // Trả về object phân trang
        return res.result;
    } catch (error) {
        console.error('Failed to fetch payments:', error);
        return {
            pageNumber: 0,
            pageSize: 10,
            totalElements: 0,
            totalPages: 0,
            content: [],
        };
    }
};

export const fetchAllPaymentsComparison = async () => {
    try {
        // Sử dụng endpoint chính xác
        const response = await get('/statistics/payment-comparison');
        return response.result || null;
    } catch (error) {
        console.error('Failed to fetch payment comparison:', error);
        // Thử endpoint khác nếu endpoint đầu tiên không hoạt động
        try {
            const fallbackResponse = await get('/payments/stats');
            return fallbackResponse.result || null;
        } catch (fallbackError) {
            console.error('Failed to fetch payment stats with fallback:', fallbackError);
            // Tính toán từ dữ liệu payments có sẵn
            try {
                const paymentsResponse = await get('/payments?size=1000');
                const payments = paymentsResponse.result?.content || [];
                return calculatePaymentStats(payments);
            } catch (calcError) {
                console.error('Failed to calculate payment stats:', calcError);
                throw error;
            }
        }
    }
};

// Function để tính toán payment statistics từ dữ liệu payments
const calculatePaymentStats = (payments) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const currentMonthPayments = payments.filter(payment => {
        if (!payment.paidAt) return false;
        const paymentDate = new Date(payment.paidAt);
        return paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear;
    });

    const lastMonthPayments = payments.filter(payment => {
        if (!payment.paidAt) return false;
        const paymentDate = new Date(payment.paidAt);
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const lastYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        return paymentDate.getMonth() === lastMonth && paymentDate.getFullYear() === lastYear;
    });

    const currentMonthRevenue = currentMonthPayments.reduce((sum, payment) => sum + (payment.amount || 0), 0);
    const lastMonthRevenue = lastMonthPayments.reduce((sum, payment) => sum + (payment.amount || 0), 0);

    const revenueChangePercentage = lastMonthRevenue > 0 ? ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 : 0;

    const successfulPayments = currentMonthPayments.filter(p => p.payosStatus === 'SUCCESS').length;
    const pendingPayments = currentMonthPayments.filter(p => p.payosStatus === 'PENDING').length;

    return {
        currentMonthTotalRevenue: currentMonthRevenue,
        revenueChangePercentage: Math.round(revenueChangePercentage),
        revenueStatus: revenueChangePercentage > 0 ? 'increase' : revenueChangePercentage < 0 ? 'decrease' : 'no_change',
        currentMonthTotalPaidPayments: successfulPayments,
        paidPaymentsChangePercentage: 0, // Cần tính toán từ last month data
        paidPaymentsStatus: 'no_change',
        currentMonthTotalPendingPayments: pendingPayments,
        pendingPaymentsChangePercentage: 0, // Cần tính toán từ last month data
        pendingPaymentsStatus: 'no_change',
        currentMonthTotalPayments: currentMonthPayments.length,
        totalPaymentsChangePercentage: 0, // Cần tính toán từ last month data
        totalPaymentsStatus: 'no_change'
    };
};

const statisticsService = {
    fetchAllEmployers,
    fetchAllJobSeekers,
    fetchTotalJobs,
    fetchTotalAppliedJobs,
    fetchDailyTrends,
    fetchJobCategories,
    // fetchAllJobs,
    fetchAllJobsForManagement,
    fetchApplicationsTrend,
    fetchMonthOverMonthComparison,
    blockEmployer,
    blockJobSeeker,
    blockJob,
    unblockJobSeeker,
    unblockEmployer,
    unblockJob,
    fetchAllPayments,
    fetchAllPaymentsComparison,
};

export default statisticsService;
