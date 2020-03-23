import React from "react";
import HomePage from "../home/HomePage";
import { Route } from "react-router-dom";

export const publicRoutes: any[] = [
    <Route key="home" path="/" exact component={HomePage} />
];

export const guestRoutes: any[] = [
    ...publicRoutes,
    <Route key="login" path="/login" component={() => <span>Login Page</span>} />,
    <Route key="register" path="/register" component={() => <span>Register Page</span>} />
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