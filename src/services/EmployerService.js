import { get, post } from '~/utils/httpRequest';

const fetchTotalJobs = async () => {
    const data = await get('/analytics/employer/job-application-counts');
    return data.result || [];
};

const fetchCreateJob = async (jobData) => {
    try {
        const response = await post('/job/create', jobData);
        return response.result;
    } catch (error) {
        console.error('Failed to create job:', error);
        throw error;
    }
};

const EmployerService = {
    fetchTotalJobs,
    fetchCreateJob, // thêm vào đây
};

export default EmployerService;
