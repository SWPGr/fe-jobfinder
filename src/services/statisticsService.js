// /src/services/statisticsService.js
import { get, post } from '~/utils/httpRequest';

const fetchAllEmployers = async () => {
    const data = await get('/users/employers');
    return data.result || [];
};

const fetchAllJobSeekers = async () => {
    const data = await get('/users/jobseekers');
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
