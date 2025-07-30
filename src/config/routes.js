import { AboutPage } from "~/pages";

const routes = {
    admin: '/admin', // Admin dashboard
    home: '/',
    profile: '/profile',
    jobs: '/jobs', // List of all jobs
    postJob: '/post-job', // Page to post a new job
    login: '/login', // Login page
    register: '/register', // Registration page
    AboutPage: '/about', // About page
    contact: '/contact', // Contact page
    dashboard: '/dashboard', // Admin or user dashboard
    applications: '/applications', // List of job applications
    applicationDetails: '/applications/:id', // Application details page
    serviceAndPolicy: '/service-and-policy',
    error: '/error',
    createCVSeekerPage: '/createCVSeekerPage',
    jobDetails: '/jobDetails/:id',
    seekerDetailPage: '/seekerDetailPage/:id',
    singleJob: '/singleJob',
    findJob: '/find-job',
    findCandidate: '/find-candidate',
    findEmployer: '/find-employer',
    verify: '/api/auth/verify',
    company: '/company/:id',
    dashboardOverview: '/dashboard-overview',
    term: '/term',
    payment: '/payment',
    resetPassword: 'api/auth/reset-password', // Reset password page
    FeedBack: '/feedback',
    PaymentManagement: '/payment',
    EventDetailPage: '/event-detail',
    JobSearchEvent: '/job-search-event',
    CandidateSearchEvent: '/candidate-search-event',
    blockedUser: '/blocked-user',
};

export default routes;
