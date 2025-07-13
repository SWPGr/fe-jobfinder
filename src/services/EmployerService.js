import { del, get, post, put } from '~/utils/httpRequest';  // Assuming get is a utility function for HTTP requests

// Fetch total number of job applications
const fetchTotalJobs = async () => {
    const data = await get('/job/my-employer-jobs');
    const result = data.result || {};

    // Calculate total applications across all jobs
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

// Create a new job
const fetchCreateJob = async (jobData) => {
    console.log(' [FAKE POST] /job/create', jobData);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
    return {
        id: Math.floor(Math.random() * 100000),
        ...jobData,
        status: 'created',
        createdAt: new Date().toISOString(),
    };
};

// Fetch education details (Fake)
const fetchEducationFake = async () => {
    const response = await get('/educations');
    return response?.result || [];
};

// Fetch job types (Fake)
const fetchJobTypesFake = async () => {
    const response = await get('/job-types');
    return response?.result || [];
};

// Fetch job levels (Fake)
const fetchJobLevelFake = async () => {
    const response = await get('/job-levels');
    return response?.result || [];
};

// Fetch employer job details (Fake)
const fetchJobEmployerFake = async () => {
    const response = await get('/job/1');
    return response || null;
};

// Fetch a list of jobs created by the employer
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

        // Format jobs data
        const jobsFormatted = data.content.map((job) => {
            const createdDate = new Date(job.createdAt);
            const defaultExpireDate = new Date(createdDate);
            defaultExpireDate.setDate(createdDate.getDate() + 30); // Simulate expiration in 30 days
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

// Fetch social link types (Fake)
const fetchSocialLinkFake = async () => {
    const response = await get('/social-types');
    return response || null;
};

// Fetch employer profile (Fake)
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

// Fetch experience details (Fake)
const fetchExperienceFake = async () => {
    const response = await get('/experiences');
    return response?.result || [];
};

// Fetch post job data (Fake)
const fetchPostJobFake = async (jobData) => {
  try {
    const response = await fetch('/job/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData),
    });

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
const fetchViewJobFake = async () => {
  const response = await get('/job/1');
  return response?.result || {}; 
};
const fetchEditJobFake = async (updatedJobData) => {
  const response = await put('/job/1', updatedJobData);
  return response?.result || {};
};
const fetchDeleteJobFake = async () => {
  const response = await del('/job/1');
  return response?.result || {}; 
};


const fetchEmployerProfileFake = async () => {
  const response = await get('/profiles/me');
  return response?.result || {}; 
};
const fetchSettingFake = async (updatedData) => {
  if (updatedData) {
    // giả lập update profile với PUT
    return await put('/profiles', updatedData);
  } else {
    // giả lập lấy profile
    return await get('/profiles/me');
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
    fetchExperienceFake,
    fetchPostJobFake,
    fetchSettingFake,
    fetchEmployerProfileFake,
    fetchViewJobFake,
    fetchEditJobFake,
    fetchDeleteJobFake,
    fetchCategoriesFake,
};

export default EmployerService;
