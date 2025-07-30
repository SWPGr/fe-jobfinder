// ~/services/JobSeekerDashboardService.js
import { get } from '~/utils/httpRequest';

const JobSeekerDashboardService = {
    getSavedJobs: async ({ page = 1, size = 20 }) => {
        try {
            return await get('/saved-jobs', { page: page - 1, size });
        } catch (error) {
            console.error('Error getSavedJobs:', error);
            return null;
        }
    },

    getSummaryJobs: async () => {
        try {
            return await get('/jobseeker-analytics/dashboard-summary');
        } catch (error) {
            console.error('Error getSummaryJobs:', error);
            return null;
        }
    }, // API lấy recently applied jobs theo ngày mới nhất (ví dụ dùng cho dashboard)
    getRecentlyAppliedJobs: async ({ page = 1, size = 5 } = {}) => {
        try {
            // Thêm sort: 'appliedAt,desc' để lấy job mới nhất
            return await get('/apply/my-applied-jobs', { page: page - 1, size, sort: 'appliedAt,desc' });
        } catch (error) {
            console.error('Error getRecentlyAppliedJobs:', error);
            return null;
        }
    }, // API mới để lấy chi tiết công việc theo jobId
    getAppliedJobs: async ({ page = 1, size = 20, token }) => {
        try {
            return await get('/apply/my-applied-jobs', { page: page - 1, size }, {});
        } catch (error) {
            console.error('Lỗi khi lấy danh sách công việc đã ứng tuyển:', error);
            return null;
        }
    },

    getJobDetail: async (jobId, token) => {
        try {
            return await get(
                `/apply/jobs/${jobId}`, // Update to the correct endpoint (e.g., /apply/jobs/{id})
                {},
                {},
            );
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết công việc:', error);
            return null;
        }
    },
};

export default JobSeekerDashboardService;
