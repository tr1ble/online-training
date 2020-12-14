import * as pages from 'pages'

interface RouteType {
    route: any;
    exact: boolean;
    path: string;
}

const mainRoutes: RouteType[] = [
    { exact: true, route: pages.MainPage, path:'/'},
    { exact: true, route: pages.SettingsPage, path:'/settings'},
    { exact: true, route: pages.TrainersPage, path:'/trainers'},
    { exact: true, route: pages.RegisterCoursePage, path:'/courses'},
    { exact: true, route: pages.TrainerTasksPage, path:'/tasks'},
    { exact: true, route: pages.StudentsPage, path:'/students'},
    { exact: true, route: pages.TrainerTrainingPage, path:'/training'}
];

export default mainRoutes;