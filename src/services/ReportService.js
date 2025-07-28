import { get, post } from '~/utils/httpRequest';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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

const getAllReportTypes = async () => {
    try {
        const response = await get(`report/report-type`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const exportToExcel = (data, fileName = 'report.xlsx') => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reports');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
};

const reportService = {
    getReports,
    createReport,
    getAllReportTypes,
    exportToExcel,
};
export default reportService;
