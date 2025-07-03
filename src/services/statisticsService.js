// /src/services/statisticsService.js
import { get } from '~/utils/httpRequest';

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
const statisticsService = {
    fetchAllEmployers,
    fetchAllJobSeekers,
    fetchTotalJobs,
    fetchTotalAppliedJobs,
    fetchDailyTrends,
    fetchJobCategories,
    fetchAllJobs,
    fetchApplicationsTrend,
};

export default statisticsService;
