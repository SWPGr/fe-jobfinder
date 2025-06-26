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
};

export default statisticsService;

// Lấy tổng số job

// export async function fetchTotalJobs(token) {
//     const res = await fetch('http://localhost:8080/api/job/total', {
//         headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//         },
//     });
//     if (!res.ok) throw new Error('Failed to fetch total jobs');
//     const data = await res.json();
//     return data.result; // là số int
// }

// Lấy tổng số applied job (đơn ứng tuyển)
// export async function fetchTotalAppliedJobs(token) {
//     const res = await fetch('http://localhost:8080/api/apply/total', {
//         headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//         },
//     });
//     if (!res.ok) throw new Error('Failed to fetch total applied jobs');
//     const data = await res.json();
//     return data.result; // là số int
// }

// export async function fetchDailyTrends(token) {
//     const res = await fetch('http://localhost:8080/api/statistics/calculated-daily-trends', {
//         headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//         },
//     });
//     if (!res.ok) throw new Error('Failed to fetch trends');
//     const data = await res.json();
//     return data.result; // Array
// }
