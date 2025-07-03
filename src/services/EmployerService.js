import { get } from '~/utils/httpRequest';

const fetchTotalJobs = async () => {
    const data = await get('/job/my-employer-jobs');
    const result = data.result || {};

    // Tính tổng số ứng viên từ tất cả job
    const totalApplicationsAcrossJobs = (result.content || []).reduce(
        (sum, job) => sum + (job.jobApplicationCounts || 0),
        0
    );

    return {
        jobApplicationCounts: (result.content || []).map((job) => ({
            jobId: job.id,
            jobTitle: job.title,
            applicationCount: job.jobApplicationCounts,
        })),
        totalApplicationsAcrossJobs,
    };
};


const fetchCreateJob = async (jobData) => {
    console.log(' [FAKE POST] /job/create', jobData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
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
}
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
        
        // Kiểm tra response và result
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

        // Ánh xạ dữ liệu từ API sang định dạng của MyJob
        const jobsFormatted = data.content.map((job) => {
            // Tính ngày còn lại
            const createdDate = new Date(job.createdAt);
            const defaultExpireDate = new Date(createdDate);
            defaultExpireDate.setDate(createdDate.getDate() + 30); // Giả lập 30 ngày
            const expireDate = job.expiredDate ? new Date(job.expiredDate) : defaultExpireDate;
            const today = new Date();
            const remainingDays = Math.max(
                0,
                Math.ceil((expireDate - today) / (1000 * 60 * 60 * 24))
            );
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
const fetchSocialLinkFake = async () => {
    const response = await get ('/social-types');
    return response || null;
}
const fetchEmployerProfile = async () => {
    try {
        const response = await get('/job/1');
        
        // Kiểm tra response và employer
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

const EmployerService = {
    fetchTotalJobs,
    fetchCreateJob,
    fetchJobTypesFake,
    fetchJobLevelFake,
    fetchJobEmployerFake,
    fetchMyJobFake,
    fetchEmployerProfile,
    fetchEducationFake,
    fetchSocialLinkFake,
};

export default EmployerService;
