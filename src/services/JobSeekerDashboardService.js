// ~/services/JobSeekerDashboardService.js
import { get } from '~/utils/httpRequest';

const JobSeekerDashboardService = {
    getAppliedJobs: async ({ page = 1, size = 20 }) => {
        try {
            return await get('/apply/my-applied-jobs', { page: page - 1, size });
        } catch (error) {
            console.error('Error getAppliedJobs:', error);
            return null;
        }
    },

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
    },
};

export default JobSeekerDashboardService;
