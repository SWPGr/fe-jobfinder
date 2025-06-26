import { get } from '~/utils/httpRequest';

const fetchTotalJobs = async () => {
    const data = await get('/job/total');
    return data.result || [];
};

const EmployerService = {
    fetchTotalJobs,
};

export default EmployerService;
