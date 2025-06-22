// /src/services/statisticsService.js

// Lấy tổng số job
export async function fetchTotalJobs(token) {
    const res = await fetch('http://localhost:8080/api/job/total', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) throw new Error('Failed to fetch total jobs');
    const data = await res.json();
    return data.result; // là số int
}

// Lấy tổng số applied job (đơn ứng tuyển)
export async function fetchTotalAppliedJobs(token) {
    const res = await fetch('http://localhost:8080/api/apply/total', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) throw new Error('Failed to fetch total applied jobs');
    const data = await res.json();
    return data.result; // là số int
}

export async function fetchDailyTrends(token) {
    const res = await fetch('http://localhost:8080/api/statistics/calculated-daily-trends', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) throw new Error('Failed to fetch trends');
    const data = await res.json();
    return data.result; // Array
}
