import { Route } from 'react-router-dom'

import pages from 'pages/AuthPage'
import * as page from 'pages'
import AuthPage from 'pages/AuthPage';

interface RouteType {
    route: any;
    exact: boolean;
    path: string;
}

const authRoutes: RouteType[] = [
    { exact: true, route: pages, path:'/'}
];

export default authRoutes;