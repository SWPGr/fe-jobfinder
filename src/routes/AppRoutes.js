//routes
import config from '~/config';

import { LoginPage, RegisterPage, HomePage, ErrorPage, DashboardPage, ServiceAndPolicyPage,CreateCVSeekerPage, FindJobPage } from '~/pages';
import { HeaderOnly } from '~/layouts';

const publicRoutes = [
    { path: config.routes.login, component: LoginPage, layout: null },
    { path: config.routes.register, component: RegisterPage, layout: null },
    { path: config.routes.home, component: HomePage, layout: HeaderOnly },
    { path: config.routes.error, component: ErrorPage, layout: null },
    { path: config.routes.createCVSeekerPage, component: CreateCVSeekerPage, layout:HeaderOnly},
    { path: config.routes.dashboard, component: DashboardPage },
    { path: config.routes.serviceAndPolicy, component: ServiceAndPolicyPage, layout: HeaderOnly },
    { path: config.routes.findJob, component: FindJobPage, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
