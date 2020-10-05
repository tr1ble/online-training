import * as pages from 'pages'

interface RouteType {
    route: any;
    exact: boolean;
    path: string;
}

const mainRoutes: RouteType[] = [
    { exact: true, route: pages.MainPage, path:'/main'},
    { exact: true, route: pages.SettingsPage, path:'/settings'},
];

export default mainRoutes;