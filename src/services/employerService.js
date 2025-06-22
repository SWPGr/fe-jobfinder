// src/services/employerService.js
export async function fetchAllEmployers() {
    const token = JSON.parse(localStorage.getItem('user'))?.token;

    console.log('Fetching employers with token:', token);
    if (!token) throw new Error('No token found in localStorage');
    const response = await fetch('http://localhost:8080/api/users/employers', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) throw new Error('Failed to fetch employers');
    const data = await response.json();
    return data.result || []; // <-- chỉ trả về mảng employers
}
