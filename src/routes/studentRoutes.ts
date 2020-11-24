import * as pages from 'pages'

interface RouteType {
    route: any;
    exact: boolean;
    path: string;
}

const mainRoutes: RouteType[] = [
    { exact: true, route: pages.MainPage, path:'/'},
    { exact: true, route: pages.SettingsPage, path:'/settings'},
    { exact: true, route: pages.ViewCoursePage, path:'/courses'},
    { exact: true, route: pages.StudentTasksPage, path:'/training'},
];

export default mainRoutes;