import React, {Suspense} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../shared/state/reducer";
import {UserState} from "../../shared/user/state/user.reducer";
import {UserRole} from "../../shared/user/model/user.model";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {guestRoutes, studentRoutes, teacherRoutes} from "./routes";
import NavbarContainer from "../../shared/components/navbar/container/NavbarContainer";
import {Spin} from "antd";

const LoadingSpinner: React.FC = () => (
    <div style={{ position: 'absolute', right: '0', top: '48px', bottom: '0', left: '0', zIndex: 1, backgroundColor: '#FFFFFFD0', paddingTop: '50%' }}>
        <Spin style={{ marginLeft: 'calc(50% - 24px)' }} tip="Se încarcă" size="large" />
    </div>
);

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
                    <Route path="*" component={() => <span>Page Not Found!</span>}  />
                </Switch>
            </BrowserRouter>
        </Suspense>
    )
};