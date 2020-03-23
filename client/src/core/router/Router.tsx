import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {useSelector} from "react-redux";
import {RootState} from "../../shared/state/reducer";
import {UserState} from "../../shared/user/state/user.reducer";
import {UserRole} from "../../shared/user/model/user.model";
import {guestRoutes, studentRoutes, teacherRoutes} from "./routes";

export const Router: React.FC = () => {
    const state = useSelector<RootState, UserState>(state => state.user);

    if (state.loading) {
        return <>Loading</>;
    }

    const isGuest = !state.data;
    const isStudent = !isGuest && state.data?.role === UserRole.STUDENT;
    const isTeacher = !isGuest && state.data?.role === UserRole.TEACHER;

    return <BrowserRouter>
        <Switch>
            {isGuest && guestRoutes}
            {isStudent && studentRoutes}
            {isTeacher && teacherRoutes}
            <Route path="*" component={() => <span>Page Not Found!</span>}  />
        </Switch>
    </BrowserRouter>
};