import { get } from '~/utils/httpRequest';

const newestJobs = async () => {
    const data = await get('/job/newest');
    return data.result || [];
};

const getWorkMarket = async () => {
    const data = await fetch('https://www.topcv.vn/get-work-market');

    return data.json();
};

const getJobOpportunitiesGrowth = async () => {
    const data = await fetch('https://www.topcv.vn/get-job-opportunity-growth');

    return data.json();
};

const getListTop = async () => {
    const data = await fetch('https://www.topcv.vn/categories/list-top');

    return data.json();
};

const jobMarketTrendsService = {
    newestJobs,
    getWorkMarket,
    getJobOpportunitiesGrowth,
    getListTop,
};

export default jobMarketTrendsService;
