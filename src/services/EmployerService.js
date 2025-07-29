// EmployerService.js
import axios from 'axios';
import { get, post, put } from '~/utils/httpRequest'; // utils httpRequest của bạn

const API_URL = 'job';

// Các hàm axios thuần cho các API job chi tiết (có thể dùng thay thế hoặc bổ sung)
const getJobDetail = (id) => axios.get(`${API_URL}/${id}`);
const updateJob = (id, data) => {
    console.log('Updating jobbbbb:');
    return axios.put(`${API_URL}/${id}`, data);
};
const deleteJob = (id) => axios.delete(`${API_URL}/${id}`);

// Các hàm fetch giả lập hoặc gọi API dùng utils/httpRequest
const fetchTotalJobs = async () => {
    const data = await get('/job/my-employer-jobs');
    const result = data.result || {};

    const totalApplicationsAcrossJobs = (result.content || []).reduce(
        (sum, job) => sum + (job.jobApplicationCounts || 0),
        0,
    );

    return {
        ...result,
        totalApplicationsAcrossJobs,
    };
};

const fetchCreateJob = async (jobData) => {
    console.log(' [FAKE POST] /job/create', jobData);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // giả lập delay
    return {
        id: Math.floor(Math.random() * 100000),
        ...jobData,
        status: 'created',
        createdAt: new Date().toISOString(),
    };
};

const fetchEducationFake = async () => {
    const response = await get('/educations');
    return response?.result || [];
};

const fetchJobTypesFake = async () => {
    const response = await get('/job-types');
    return response?.result || [];
};

const fetchJobLevelFake = async () => {
    const response = await get('/job-levels');
    return response?.result || [];
};

const fetchJobEmployerFake = async () => {
    const response = await get('/job/1');
    return response || null;
};

const fetchMyJobFake = async (page = 0, size = 10) => {
    try {
        const response = await get(`/job/my-employer-jobs?page=${page}&size=${size}`);

        if (!response || !response.result || !Array.isArray(response.result.content)) {
            console.warn('Invalid API response structure:', response);
            return {
                jobs: [],
                pagination: {
                    pageNumber: 0,
                    pageSize: size,
                    totalElements: 0,
                    totalPages: 1,
                    isFirst: true,
                    isLast: true,
                },
            };
        }

        const data = response.result;

        const jobsFormatted = data.content.map((job) => {
            const createdDate = new Date(job.createdAt);
            const defaultExpireDate = new Date(createdDate);
            defaultExpireDate.setDate(createdDate.getDate() + 30);
            const expireDate = job.expiredDate ? new Date(job.expiredDate) : defaultExpireDate;
            const today = new Date();
            const remainingDays = Math.max(0, Math.ceil((expireDate - today) / (1000 * 60 * 60 * 24)));
            const remainingText = remainingDays > 0 ? `${remainingDays} days remaining` : 'Expired';

            return {
                jobTitle: job.title || 'Unknown Title',
                workTime: job.jobType?.name || 'Unknown Type',
                remainDay: remainingText,
                isActive: remainingDays > 0,
                numberApplications: job.jobApplicationCounts || 0,
                isVIP: job.employer?.isPremium || false,
                id: job.id,
            };
        });

        return {
            jobs: jobsFormatted,
            pagination: {
                pageNumber: data.pageNumber ?? 0,
                pageSize: data.pageSize ?? size,
                totalElements: data.totalElements ?? 0,
                totalPages: data.totalPages ?? 1,
                isFirst: data.first ?? true,
                isLast: data.last ?? true,
            },
        };
    } catch (error) {
        console.error('Error fetching my jobs:', error.message);
        return {
            jobs: [],
            pagination: {
                pageNumber: 0,
                pageSize: size,
                totalElements: 0,
                totalPages: 1,
                isFirst: true,
                isLast: true,
            },
        };
    }
};
const fetchstatusesFake = async () => {
    const response = await get('/apply/statuses');
    return response || null;
};
const fetchStatusJobFake = async (applicationId, status, message) => {
    try {
        const response = await put(`/apply/${applicationId}/status`, {
            status,        // "ACCEPTED" hoặc "REFUSED"
            message,       // tin nhắn gửi kèm
        });
        return response || null;
    } catch (error) {
        console.error("Error updating application status:", error);
        throw error;
    }
};
const fetchSocialLinkFake = async () => {
    const response = await get('/social-types');
    return response || null;
};

const fetchEmployerProfile = async () => {
    try {
        const response = await get('/job/1');
        if (!response || !response.result || !response.result.employer) {
            console.warn('Invalid API response structure for employer profile:', response);
            return null;
        }

        return response.result.employer;
    } catch (error) {
        console.error('Error fetching employer profile:', error.message);
        return null;
    }
};

const fetchExperienceFake = async () => {
    const response = await get('/experiences');
    return response?.result || [];
};

const fetchPostJobFake = async (jobData) => {
    try {
        const response = await fetch('/job/create');

        const data = await response.json();

        if (!response.ok) {
            console.error('API Error Response:', data);
            throw new Error(data.message || 'Uncategorized error');
        }

        return data?.result || {};
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

const fetchCategoriesFake = async () => {
    const response = await get('/categories');
    return response?.result || [];
};

// Thêm hàm fetchJobDetailFake sử dụng utils httpRequest
const fetchJobDetailFake = async (id, updatedData = null, deleteFlag = false) => {
    try {
        if (deleteFlag) {
            const response = await EmployerService.deleteJob(id);
            return response.data || {};
        }
        const response = await EmployerService.getJobDetail(id);
        return response.data || {};
    } catch (error) {
        console.error('Error fetching/updating/deleting job:', error);
        throw error;
    }
};

const fetchEmployerProfileFake = async () => {
    const response = await get('/profiles/me');
    console.log(response);

    return response || response?.result || {};
};

const fetchSettingFake = async (updatedData) => {
    if (updatedData) {
        return await put('/profiles', updatedData);
    } else {
        return await get('/profiles/me');
    }
};
const fetchApplicationFake = async (jobId) => {
    const response = await get(`/apply/${jobId}`);
    return response?.result || [];
};
const fetchCandidateDetail = async (applicationId) => {
    const response = await get(`/apply/candidates/${applicationId}`);
    return response?.result || null;
};
const fetchFilteredCandidates = async (jobId, filters, sortOrder) => {
    const query = new URLSearchParams();

    if (filters.fullName) query.append("fullName", filters.fullName);
    if (filters.education) query.append("educationName", filters.education);
    if (filters.experience) query.append("experienceName", filters.experience);

    // sort: asc hoặc desc theo fullName
    query.append(
        "sort",
        `jobSeeker.userDetail.fullName,${sortOrder === "newest" ? "asc" : "desc"}`
    );

    const response = await get(`/apply/candidates/${jobId}?${query.toString()}`);
    return response?.result || null;
};

const fetchResume = async ({ applicationId }) => {
    if (!applicationId) throw new Error("applicationId is required");
    const response = await get(`/apply/${applicationId}/summarize-resume`);
    return response?.result || null;
};
const fetchStatus = async () => {
    const response = await get(`/apply/statuses`);
    return response?.result || null;
};
const fetchApplicationData = async (id, type = 'application') => {
    try {
        let response;
        if (type === 'application') {
            response = await get(`/apply/${id}`);
        } else if (type === 'candidates') {
            response = await get(`/apply/candidates/${id}`);
        } else if (type === 'user') {
            // Gọi API lấy resume summary theo userId
            response = await get(`/apply/${id}/summarize-resume`);
        } else {
            throw new Error('Invalid fetch type');
        }
        return response?.result || null;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
};
const uploadFile = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        // Gọi API upload (bạn thay URL này bằng endpoint thật)
        const response = await post('/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        // Trả về link file hoặc dữ liệu cần thiết từ API
        return response?.result?.url || null;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};
const EmployerService = {
    getJobDetail,
    updateJob,
    deleteJob,
    fetchTotalJobs,
    fetchCreateJob,
    fetchJobTypesFake,
    fetchJobLevelFake,
    fetchJobEmployerFake,
    fetchApplicationData,
    fetchMyJobFake,
    fetchCandidateDetail,
    fetchEmployerProfile,
    fetchEducationFake,
    fetchSocialLinkFake,
    fetchExperienceFake,
    fetchPostJobFake,
    fetchSettingFake,
    fetchStatusJobFake,
    fetchStatus,
    fetchstatusesFake,
    fetchEmployerProfileFake,
    fetchJobDetailFake,
    fetchCategoriesFake,
    fetchApplicationFake,
    fetchResume,
    fetchFilteredCandidates,
    uploadFile,
};

export default EmployerService;
