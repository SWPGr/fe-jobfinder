//routes
import config from '~/config';


import { LoginPage, RegisterPage, HomePage, ErrorPage, DashboardPage, ServiceAndPolicyPage,CreateCVSeekerPage, FindJobPage, JobDetail, SeekerDetailPage, single } from '~/pages';

import {
   // LoginPage,
   // RegisterPage,
   // HomePage,
   // ErrorPage,
   // DashboardPage,
   // ServiceAndPolicyPage,
   // CreateCVSeekerPage,
    FindJob,
    VerifyPage,
} from '~/pages';

import { HeaderOnly } from '~/layouts';
import Single from '~/pages/Single/Single';



const publicRoutes = [
    { path: config.routes.login, component: LoginPage, layout: null },
    { path: config.routes.register, component: RegisterPage, layout: null },
    { path: config.routes.home, component: HomePage, layout: HeaderOnly },
    { path: config.routes.error, component: ErrorPage, layout: null },

    { path: config.routes.createCVSeekerPage, component: CreateCVSeekerPage, layout: HeaderOnly },

    { path: config.routes.dashboard, component: DashboardPage },
    { path: config.routes.serviceAndPolicy, component: ServiceAndPolicyPage },
    { path: config.routes.serviceAndPolicy, component: ServiceAndPolicyPage, layout: HeaderOnly },

    { path: config.routes.findJobPage, component: FindJobPage, layout: HeaderOnly },
    {path:config.routes.jobDetails,component:JobDetail,layout:HeaderOnly},
    { path: config.routes.seekerDetailPage, component: SeekerDetailPage, layout:HeaderOnly},

    { path: config.routes.verify, component: VerifyPage, layout: null },
    { path: config.routes.single, component: Single, layout: HeaderOnly },
 
];

const privateRoutes = [
    { path: config.routes.dashboard, component: DashboardPage },
    { path: config.routes.findJob, component: FindJob, layout: HeaderOnly },
];

export { publicRoutes, privateRoutes };
