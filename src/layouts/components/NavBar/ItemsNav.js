const itemsNav = {
    false: [
        { name: 'Home', link: '/' },
        { name: 'Find Job', link: '/find-job' },
        { name: 'Employers', link: '/dashboard/employers' },
        { name: 'Candidates', link: '/candidates' },
        { name: 'Pricing Plans', link: '/pricing-plan' },
        { name: 'Customer Supports', link: '/customer-supports' },
    ],
    true: {
        ADMIN: [
            { name: 'Home', link: '/' },
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'Manage Users', link: '/dashboard/jobseekers' },
            { name: 'Manage Jobs', link: '/dashboard/jobs' },
            { name: 'Reports', link: '/reports' },
            { name: 'Settings', link: '/dashboard/settings' },
        ],
        JOB_SEEKER: [
            { name: 'Home', link: '/' },
            { name: 'Find Job', link: '/find-job' },
            { name: 'Find Employers', link: '/find-employer' },
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'Job Alerts', link: '/dashboard/alerts' },
            { name: 'Customer Supports', link: '/customer-supports' },
        ],
        EMPLOYER: [
            { name: 'Home', link: '/' },
            { name: 'Find Candidate', link: '/find-candidate' },
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'My Jobs', link: '/dashboard/my-jobs' },
            { name: 'Applications', link: '/dashboard/saved-candidates' },
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
