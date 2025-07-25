import { get, post } from '~/utils/httpRequest';
export const getReports = async (params) => {
    try {
        const response = await get(`report/reports/search`, params);
        return response;
    } catch (error) {
        throw error;
    }
};

export const createReport = async (data) => {
    try {
        const response = await post(`report`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

const getAllReportType = async () => {
    try {
        const response = await get(`report/report-type`);
        return response;
    } catch (error) {
        throw error;
    }
};

const reportService = {
    getReports,
    createReport,
    getAllReportType,
};
export default reportService;
