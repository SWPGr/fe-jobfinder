//routes
import config from '~/config';

<<<<<<< HEAD
import { LoginPage, RegisterPage, HomePage, ErrorPage, DashboardPage } from '~/pages';
=======
import { LoginPage, RegisterPage, HomePage, ErrorPage, ServiceAndPolicyPage } from '~/pages';
>>>>>>> origin/develop

const publicRoutes = [
    { path: config.routes.login, component: LoginPage, layout: null },
    { path: config.routes.register, component: RegisterPage, layout: null },
    { path: config.routes.home, component: HomePage },
    { path: config.routes.error, component: ErrorPage, layout: null },
<<<<<<< HEAD


    { path: config.routes.dashboard, component: DashboardPage },
=======
    { path: config.routes.serviceAndPolicy, component: ServiceAndPolicyPage },
>>>>>>> origin/develop
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
 