// /src/services/statisticsService.js
import { get, put } from '~/utils/httpRequest';

const fetchAllEmployers = async () => {
    const data = await get('/users/employers');
    return data.result || [];
};
export const fetchAllJobs = async () => {
    try {
        const res = await get('/job/list');
        console.log('Raw response:', res); // ✅ đã là mảng
        return res; // 👉 trả về trực tiếp mảng
    } catch (error) {
        console.error('Failed to fetch jobs:', error);
        return [];
    }
};

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

const fetchTotalJobs = async () => {
    const data = await get('/job/total');
    return data.result || [];
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
            '/job/status', // Đường dẫn khớp với endpoint Postman
            {
                jobId: jobId, // Sử dụng jobId (dựa trên Postman)
                isActive: false, // Khớp với backend
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
const statisticsService = {
    fetchAllEmployers,
    fetchAllJobSeekers,
    fetchTotalJobs,
    fetchTotalAppliedJobs,
    fetchDailyTrends,
    fetchJobCategories,
    fetchAllJobs,
    fetchApplicationsTrend,
    fetchMonthOverMonthComparison,
    blockEmployer,
    blockJobSeeker,
    blockJob,
};

export default statisticsService;
