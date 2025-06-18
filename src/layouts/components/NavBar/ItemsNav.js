const itemsNav = {
    false: [
        { name: 'Home', link: '/' },
        { name: 'Find Job', link: '/find-job' },
        { name: 'Employers', link: '/employers' },
        { name: 'Candidates', link: '/candidates' },
        { name: 'Pricing Plans', link: '/pricing-plan' },
        { name: 'Customer Supports', link: '/customer-supports' },
    ],
    true: {
        ADMIN: [
            { name: 'Home', link: '/' },
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'Manage Users', link: '/manage-users' },
            { name: 'Manage Jobs', link: '/manage-jobs' },
            { name: 'Reports', link: '/reports' },
            { name: 'Settings', link: '/settings' },
        ],
        JOB_SEEKER: [
            { name: 'Home', link: '/' },
            { name: 'Find Job', link: '/find-job' },
            { name: 'Find Employers', link: '/find-employer' },
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'Job Alerts', link: '/job-alerts' },
            { name: 'Customer Supports', link: '/customer-supports' },
        ],
        EMPLOYER: [
            { name: 'Home', link: '/' },
            { name: 'Find Candidate', link: '/find-candidate' },
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'My Jobs', link: '/my-jobs' },
            { name: 'Applications', link: '/applications' },
            { name: 'Customer Supports', link: '/customer-supports' },
        ],
    },
};

export default function getNavItems(isAuthenticated, role) {
    if (!isAuthenticated) {
        return itemsNav.false;
    }
    return itemsNav.true[role] || [];
}
