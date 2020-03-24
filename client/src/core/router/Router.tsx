import React, {Suspense} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../shared/state/reducer";
import {UserState} from "../../shared/user/state/user.reducer";
import {UserRole} from "../../shared/user/model/user.model";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {guestRoutes, studentRoutes, teacherRoutes} from "./routes";
import NavbarContainer from "../../shared/components/navbar/container/NavbarContainer";

export const Router: React.FC = () => {
    const state = useSelector<RootState, UserState>(state => state.user);

    if (state.loading) {
        return <>Loading</>;
    }

    const isGuest = !state.data;
    const isStudent = !isGuest && state.data?.role === UserRole.STUDENT;
    const isTeacher = !isGuest && state.data?.role === UserRole.TEACHER;

    return (
        <Suspense fallback={<div>Loading</div>}>
            <BrowserRouter>
                <NavbarContainer />
                <Switch>
                    {isGuest && guestRoutes}
                    {isStudent && studentRoutes}
                    {isTeacher && teacherRoutes}
                    <Route path="*" component={() => <span>Page Not Found!</span>}  />
                </Switch>
            </BrowserRouter>
        </Suspense>
    )
};