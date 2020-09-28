import * as pages from 'pages'

interface RouteType {
    route: any;
    exact: boolean;
    path: string;
}

const authRoutes: RouteType[] = [
    { exact: true, route: pages.HomePage, path:'/'},
    { exact: true, route: pages.RegisterPage, path:'/register'}
];

export default authRoutes;