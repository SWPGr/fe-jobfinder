import axios from 'axios';
import { del, get, post, put } from '~/utils/httpRequest'; // utils httpRequest của bạn

const API_URL = 'http://localhost:8080/api/job';

// Các hàm axios thuần cho các API job chi tiết (có thể dùng thay thế hoặc bổ sung)
const getJobDetail = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching job detail for ID ${id}:`, error);
        throw error;
    }
};

const updateJob = async (id, data) => {
    try {
        console.log('Updating jobbbbb:');
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating job with ID ${id}:`, error);
        throw error;
    }
};

const deleteJob = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting job with ID ${id}:`, error);
        throw error;
    }
};

// Các hàm fetch giả lập hoặc gọi API dùng utils/httpRequest
const fetchTotalJobs = async () => {
    try {
        const data = await get('/job/my-employer-jobs');
        const result = data.result || {};

        const totalApplicationsAcrossJobs = (result.content || []).reduce(
            (sum, job) => sum + (job.jobApplicationCounts || 0),
            0
        );

        return {
            ...result,
            totalApplicationsAcrossJobs,
        };
    } catch (error) {
        console.error('Error fetching total jobs:', error);
        return { jobs: [], pagination: {} };
    }
};

const fetchCreateJob = async (jobData) => {
    try {
        console.log(' [FAKE POST] /job/create', jobData);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // giả lập delay
        return {
            id: Math.floor(Math.random() * 100000),
            ...jobData,
            status: 'created',
            createdAt: new Date().toISOString(),
        };
    } catch (error) {
        console.error('Error creating job:', error);
        throw error;
    }
};

const fetchEducationFake = async () => {
    try {
        const response = await get('/educations');
        return response?.result || [];
    } catch (error) {
        console.error('Error fetching education data:', error);
        return [];
    }
};

const fetchJobTypesFake = async () => {
    try {
        const response = await get('/job-types');
        return response?.result || [];
    } catch (error) {
        console.error('Error fetching job types:', error);
        return [];
    }
};

const fetchJobLevelFake = async () => {
    try {
        const response = await get('/job-levels');
        return response?.result || [];
    } catch (error) {
        console.error('Error fetching job levels:', error);
        return [];
    }
};

const fetchJobEmployerFake = async () => {
    try {
        const response = await get('/job/1');
        return response || null;
    } catch (error) {
        console.error('Error fetching job employer:', error);
        return null;
    }
};

const fetchMyJobFake = async (page = 0, size = 10, isActive = true, jobTitle = '', fromDate = '', toDate = '') => {
    try {
        const formattedFromDate = fromDate ? new Date(fromDate).toISOString() : '';
        const formattedToDate = toDate ? new Date(toDate).toISOString() : '';

        let url = `/job/my-employer-jobs?page=${page}&size=${size}&isActive=${isActive}&jobTitle=${jobTitle}&fromDate=${formattedFromDate}`;
        
        if (formattedToDate) {
            url += `&toDate=${formattedToDate}`;
        }

        const response = await get(url);

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
    try {
        const response = await get('/experiences');
        return response?.result || [];
    } catch (error) {
        console.error('Error fetching experiences:', error);
        return [];
    }
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
    try {
        const response = await get('/categories');
        return response?.result || [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

const fetchJobDetailFake = async (id, updatedData = null, deleteFlag = false) => {
    try {
        if (deleteFlag) {
            const response = await deleteJob(id);
            return response.data || {};
        }
        const response = await getJobDetail(id);
        return response.data || {};
    } catch (error) {
        console.error('Error fetching/updating/deleting job:', error);
        throw error;
    }
};

const fetchSettingFake = async (updatedData) => {
    try {
        if (updatedData) {
            return await put('/profiles', updatedData);
        } else {
            return await get('/profiles/me');
        }
    } catch (error) {
        console.error('Error fetching/updating profile settings:', error);
        return null;
    }
};

const fetchApplicationFake = async (jobId) => {
    try {
        const response = await get(`/apply/${jobId}`);
        return response?.result || [];
    } catch (error) {
        console.error('Error fetching application data:', error);
        return [];
    }
};

const fetchCandidateDetail = async (applicationId) => {
    try {
        const response = await get(`/apply/candidates/${applicationId}`);
        return response?.result || null;
    } catch (error) {
        console.error('Error fetching candidate detail:', error);
        return null;
    }
};

const fetchFilteredCandidates = async (jobId, filters, sortOrder) => {
    try {
        const query = new URLSearchParams();

        if (filters.fullName) query.append("fullName", filters.fullName);
        if (filters.education) query.append("educationName", filters.education);
        if (filters.experience) query.append("experienceName", filters.experience);

        query.append(
            "sort",
            `jobSeeker.userDetail.fullName,${sortOrder === "newest" ? "asc" : "desc"}`
        );

        const response = await get(`/apply/candidates/${jobId}?${query.toString()}`);
        return response?.result || null;
    } catch (error) {
        console.error('Error fetching filtered candidates:', error);
        return null;
    }
};

const fetchResume = async ({ applicationId }) => {
    try {
        if (!applicationId) throw new Error("applicationId is required");
        const response = await get(`/apply/${applicationId}/summarize-resume`);
        return response?.result || null;
    } catch (error) {
        console.error('Error fetching resume:', error);
        return null;
    }
};

const fetchStatus = async () => {
    try {
        const response = await get(`/apply/statuses`);
        return response?.result || null;
    } catch (error) {
        console.error('Error fetching status:', error);
        return null;
    }
};

const fetchApplicationData = async (id, type = 'application') => {
    try {
        let response;
        if (type === 'application') {
            response = await get(`/apply/${id}`);
        } else if (type === 'candidates') {
            response = await get(`/apply/candidates/${id}`);
        } else if (type === 'user') {
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

        const response = await post('/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return response?.result?.url || null;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};
const fetchSocialLinkFake = async () => {
    try {
        const response = await get('/social-types');
        return response || null;
    } catch (error) {
        console.error('Error fetching social link types:', error);
        return null;
    }
};

const fetchstatusesFake = async () => {
    try {
        const response = await get('/apply/statuses');
        return response || null;
    } catch (error) {
        console.error('Error fetching statuses:', error);
        return null;
    }
};

const fetchEmployerProfileFake = async () => {
    try {
        const response = await get('/profiles/me');
        return response?.result || {};
    } catch (error) {
        console.error('Error fetching employer profile:', error);
        return {};
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
