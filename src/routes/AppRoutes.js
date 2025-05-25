//routes
import config from '~/config';

import { LoginPage, RegisterPage, HomePage, ErrorPage, ServiceAndPolicyPage, DashboardPage } from '~/pages';

const publicRoutes = [
    { path: config.routes.login, component: LoginPage, layout: null },
    { path: config.routes.register, component: RegisterPage, layout: null },
    { path: config.routes.home, component: HomePage },
    { path: config.routes.error, component: ErrorPage, layout: null },

    { path: config.routes.dashboard, component: DashboardPage },

    { path: config.routes.serviceAndPolicy, component: ServiceAndPolicyPage },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
