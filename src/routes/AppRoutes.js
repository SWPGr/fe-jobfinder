//routes
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
    single,
    FindJob,
    VerifyPage,
    FindEmployer,
    FindCandidate,
    DashboardOverview,
    SingleJobPage,
    Term,
    ResetPassword,
} from '~/pages';

import { HeaderOnly } from '~/layouts';
import Single from '~/pages/Single/Single';

import Payment from '~/pages/Payment/Payment';

const publicRoutes = [
    { path: config.routes.login, component: LoginPage, layout: null },
    { path: config.routes.register, component: RegisterPage, layout: null },
    { path: config.routes.home, component: HomePage, layout: HeaderOnly },
    { path: config.routes.error, component: ErrorPage, layout: null },
    { path: config.routes.createCVSeekerPage, component: CreateCVSeekerPage, layout: HeaderOnly },
    { path: config.routes.dashboard, component: DashboardPage },
    { path: config.routes.serviceAndPolicy, component: ServiceAndPolicyPage, layout: HeaderOnly },
    { path: config.routes.findJobPage, component: FindJobPage, layout: HeaderOnly },
    { path: config.routes.jobDetails, component: JobDetail, layout: HeaderOnly },
    { path: config.routes.seekerDetailPage, component: SeekerDetailPage, layout: HeaderOnly },
    { path: config.routes.verify, component: VerifyPage, layout: null },
    { path: config.routes.company, component: Single, layout: HeaderOnly },
    { path: config.routes.dashboardOverview, component: DashboardOverview, layout: HeaderOnly },
    { path: config.routes.term, component: Term, layout: null },
    { path: config.routes.payment, component: Payment, layout: HeaderOnly },
    { path: config.routes.resetPassword, component: ResetPassword, layout: null },
    { path: config.routes.verify, component: VerifyPage, layout: null },
    { path: config.routes.findJob, component: FindJob, layout: HeaderOnly },
];

const privateRoutes = [
    { path: config.routes.dashboard, component: DashboardPage },
    { path: config.routes.dashboard + '/:page', component: DashboardPage },
    { path: config.routes.findEmployer, component: FindEmployer, layout: HeaderOnly },
    { path: config.routes.findCandidate, component: FindCandidate, layout: HeaderOnly },
];

export { publicRoutes, privateRoutes };
