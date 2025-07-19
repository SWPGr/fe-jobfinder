// routes
import config from '~/config';
import {
    LoginPage,
    RegisterPage,
    HomePage,
    ErrorPage,
    DashboardPage,
    ServiceAndPolicyPage,
    CreateCVSeekerPage,
    FindJobPage,
    JobDetail,
    SeekerDetailPage,
    VerifyPage,
    FindEmployer,
    FindCandidate,
    DashboardOverview,
    Term,
    ResetPassword,
    CustomerSupport,
    PaymentManagement,
    EventDetailPage,
} from '~/pages';

import { HeaderOnly } from '~/layouts';
import Single from '~/pages/Single/Single';
import Payment from '~/pages/Payment/Payment';
// import UnauthorizedPage from '~/pages/UnauthorizedPage'; // Thêm nếu chưa có
import FeedBack from '~/pages/FeedBack/FeedBack';

// Các route ai cũng truy cập được
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
    // { path: '/unauthorized', component: UnauthorizedPage, layout: null }, // xử lý khi truy cập trái phép
    { path: config.routes.findJob, component: FindJobPage, layout: HeaderOnly },
    { path: config.routes.FeedBack, component: FeedBack, layout: HeaderOnly },
    { path: config.routes.PaymentManagement, component: PaymentManagement, layout: HeaderOnly },
    { path: config.routes.EventDetailPage, component: EventDetailPage, layout: HeaderOnly },
];

// Các route yêu cầu đăng nhập, kèm role tương ứng
const privateRoutes = [
    {
        path: config.routes.dashboard,
        component: DashboardPage,
        allowedRoles: ['EMPLOYER', 'ADMIN', 'JOB_SEEKER'],
    },
    {
        path: config.routes.dashboard + '/:page',
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
        path: config.routes.dashboardOverview,
        component: DashboardOverview,
        layout: HeaderOnly,
        allowedRoles: ['EMPLOYER', 'ADMIN'],
    },
    {
        path: config.routes.payment,
        component: Payment,
        layout: HeaderOnly,
        allowedRoles: ['EMPLOYER, JOB_SEEKER, ADMIN'],
    },
];

export { publicRoutes, privateRoutes };
