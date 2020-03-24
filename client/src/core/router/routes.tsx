import React from "react";
import { Route } from "react-router-dom";


export const publicRoutes: any[] = [
    <Route key="home" path="/" exact component={React.lazy(() => import('../home/HomePage'))} />
];

export const guestRoutes: any[] = [
    ...publicRoutes,
    <Route key="login" path="/login" component={React.lazy(() => import('../../modules/user/components/page/LoginPage'))} />,
    <Route key="register" path="/register" component={React.lazy(() => import('../../modules/user/components/page/RegisterPage'))} />,
];

export const authenticatedRoutes: any[] = [
    ...publicRoutes,
    <Route key="profile" path="/profile" component={() => <span>Profile Page</span>} />
];

export const studentRoutes: any[] = [
    ...authenticatedRoutes,
    <Route key="profile-grades" path="/profile/grades" component={() => <span>Grades Page</span>} />
];

export const teacherRoutes: any[] = [
    ...authenticatedRoutes,
    <Route key="administration" path="/administration" component={() => <span>Administration Page</span>} />
];