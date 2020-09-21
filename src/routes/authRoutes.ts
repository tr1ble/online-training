import * as page from 'pages'

interface RouteType {
    route: any;
    exact: boolean;
    path: string;
}

const authRoutes: RouteType[] = [
    { exact: true, route: page.HomePage, path:'/'}
];

export default authRoutes;