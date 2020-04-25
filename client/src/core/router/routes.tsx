import React from "react";
import { Route } from "react-router-dom";


export const publicRoutes: any[] = [
    <Route key="home" path="/" exact component={React.lazy(() => import('../home/HomePage'))} />,
    <Route key="login" path="/login" exact component={React.lazy(() => import('../../modules/user/page/LoginPage'))} />,
];

export const guestRoutes: any[] = [
    ...publicRoutes,
    <Route key="register" path="/register" exact component={React.lazy(() => import('../../modules/user/page/RegisterPage'))} />,
];

export const authenticatedRoutes: any[] = [
    ...publicRoutes,
    <Route key="home" path="/courses" exact component={React.lazy(() => import('../../modules/course/page/CourseListPage'))} />,
    <Route key="home" path="/courses/:id" exact component={React.lazy(() => import('../../modules/course/page/CourseDetailsPage'))} />,
    <Route key="profile" path="/profile" exact component={() => <span>Profile Page</span>} />
];

export const studentRoutes: any[] = [
    ...authenticatedRoutes,
];

export const teacherRoutes: any[] = [
    ...authenticatedRoutes,
];