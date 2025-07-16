// ~/services/JobSeekerDashboardService.js
import { get } from '~/utils/httpRequest';

const JobSeekerDashboardService = {
    getAppliedJobs: async ({ page = 1, size = 20, token }) => {
        try {
            return await get('/api/apply/my-applied-jobs', {
                params: { page: page - 1, size },
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (error) {
            console.error('Error getAppliedJobs:', error);
            return null;
        }
    },

    getSavedJobs: async ({ page = 1, size = 20, token }) => {
        try {
            return await get('/api/saved-jobs', {
                params: { page: page - 1, size },
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (error) {
            console.error('Error getSavedJobs:', error);
            return null;
        }
    },
};

export default JobSeekerDashboardService;
