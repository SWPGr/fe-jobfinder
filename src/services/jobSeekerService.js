// Service: Fetch all job seekers
export async function fetchAllJobSeekers(token) {
    const response = await fetch('http://localhost:8080/api/users/jobseekers', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) throw new Error('Failed to fetch job seekers');
    const data = await response.json(); // { code, message, result: [...] }
    return data.result || [];
}
