// routes.js
import { lazy } from 'react';
import config from '~/config';

import { HeaderOnly } from '~/layouts';

// ⚠️ Dùng lazy import từng page (đảm bảo các file export mặc định)

const LoginPage = lazy(() => import('~/pages/Login/Login'));
const RegisterPage = lazy(() => import('~/pages/Register/Register'));
const HomePage = lazy(() => import('~/pages/Home/Home'));
const ErrorPage = lazy(() => import('~/pages/Error/Error'));
const DashboardPage = lazy(() => import('~/pages/DashBoard/OverviewDashBoard'));
const ServiceAndPolicyPage = lazy(() => import('~/pages/ServiceAndPolicy/index'));
const CreateCVSeekerPage = lazy(() => import('~/pages/CreateCVSeeker/Overview1'));
const FindJobPage = lazy(() => import('~/pages/FindJob/FindJobPage'));
const JobDetail = lazy(() => import('~/pages/JobDetail/JobDetail'));
const SeekerDetailPage = lazy(() => import('~/pages/SeekerDetail/SeekerDetail'));
const VerifyPage = lazy(() => import('~/pages/Verify/VerifyPage'));
const FindEmployer = lazy(() => import('~/pages/FindEmployer/FindEmployer'));
const FindCandidate = lazy(() => import('~/pages/FindCandidate/FindCandidate'));
const Term = lazy(() => import('~/pages/Term/Term'));
const ResetPassword = lazy(() => import('~/pages/ResetPassword/ResetPassword'));
// const CustomerSupport = lazy(() => import('~/pages/'));
const PaymentManagement = lazy(() => import('~/pages/Payment/Payment'));
const Single = lazy(() => import('~/pages/Single/Single'));
const Payment = lazy(() => import('~/pages/Payment/Payment'));
const FeedBack = lazy(() => import('~/pages/FeedBack/FeedBack'));
// const UnauthorizedPage = lazy(() => import('~/pages/UnauthorizedPage')); // nếu cần
const CandidatesPage = lazy(() => import('~/pages/CandidatesPage/CandidatesPage'));
const JobListingPage = lazy(() => import('~/pages/JobListingsPage/JobListingPage'));
const EventDetailPage = lazy(() => import('~/pages/Home/EventDetailPage'));
const BlockedUserPage = lazy(() => import('~/pages/BlockedUser/BlockedUser'));

// ✅ Các route ai cũng truy cập được
const publicRoutes = [
    { path: config.routes.login, component: LoginPage, layout: null },
    { path: config.routes.register, component: RegisterPage, layout: null },
    { path: config.routes.home, component: HomePage, layout: HeaderOnly },
    { path: config.routes.error, component: ErrorPage, layout: null },
    { path: config.routes.serviceAndPolicy, component: ServiceAndPolicyPage, layout: HeaderOnly },
    { path: config.routes.findJob, component: FindJobPage, layout: HeaderOnly },
    { path: config.routes.jobDetails, component: JobDetail, layout: HeaderOnly },
    { path: config.routes.seekerDetailPage, component: SeekerDetailPage, layout: HeaderOnly },
    { path: config.routes.company, component: Single, layout: HeaderOnly },
    { path: config.routes.term, component: Term, layout: null },
    { path: config.routes.resetPassword, component: ResetPassword, layout: null },
    { path: config.routes.verify, component: VerifyPage, layout: null },
    { path: config.routes.FeedBack, component: FeedBack, layout: HeaderOnly },
    { path: config.routes.PaymentManagement, component: PaymentManagement, layout: HeaderOnly },

    { path: config.routes.EventDetailPage, component: EventDetailPage, layout: HeaderOnly },
    { path: config.routes.blockedUser, component: BlockedUserPage, layout: null },

    { path: config.routes.CandidateSearchEvent, component: CandidatesPage, layout: HeaderOnly },
    { path: config.routes.JobSearchEvent, component: JobListingPage, layout: HeaderOnly },
];

// ✅ Các route yêu cầu đăng nhập
const privateRoutes = [
    {
        path: config.routes.dashboard,
        component: DashboardPage,
        allowedRoles: ['EMPLOYER', 'ADMIN', 'JOB_SEEKER'],
    },
    {
        path: config.routes.dashboard + '/:page?/:item?',
        component: DashboardPage,
        allowedRoles: ['EMPLOYER', 'ADMIN', 'JOB_SEEKER'],
    },
    {
        path: config.routes.findEmployer,
        component: FindEmployer,
        layout: HeaderOnly,
        allowedRoles: ['JOB_SEEKER'],
    },
    {
        path: config.routes.findCandidate,
        component: FindCandidate,
        layout: HeaderOnly,
        allowedRoles: ['EMPLOYER'],
    },
    {
        path: config.routes.createCVSeekerPage,
        component: CreateCVSeekerPage,
        layout: HeaderOnly,
        allowedRoles: ['JOB_SEEKER'],
    },

    {
        path: config.routes.payment,
        component: Payment,
        layout: HeaderOnly,
        allowedRoles: ['EMPLOYER', 'JOB_SEEKER', 'ADMIN'],
    },
];

export { publicRoutes, privateRoutes };
