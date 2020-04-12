import React, {Suspense} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../shared/state/reducer";
import {UserState} from "../../shared/user/state/user.reducer";
import {UserRole} from "../../shared/user/model/user.model";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {guestRoutes, studentRoutes, teacherRoutes} from "./routes";
import NavbarContainer from "../../shared/components/navbar/container/NavbarContainer";
import LoadingSpinner from "../../shared/components/spinner/LoadingSpinner";
import Layout from "../../shared/components/layout/Layout";


export const Router: React.FC = () => {
    const state = useSelector<RootState, UserState>(state => state.user);

    if (state.loading) {
        return <LoadingSpinner/>;
    }

    const isGuest = !state.data;
    const isStudent = !isGuest && state.data?.role === UserRole.STUDENT;
    const isTeacher = !isGuest && state.data?.role === UserRole.TEACHER;

    return (
        <Suspense fallback={<LoadingSpinner />}>
            <BrowserRouter>
                <NavbarContainer />
                <Switch>
                    {isGuest && guestRoutes}
                    {isStudent && studentRoutes}
                    {isTeacher && teacherRoutes}
                    <Route path="/not-found" exact component={() => <Layout><span>Page Not Found!</span></Layout>}  />
                    <Route path="**" component={() => <Redirect to="/not-found" />} />
                </Switch>
            </BrowserRouter>
        </Suspense>
    )
};