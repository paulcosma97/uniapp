import React from "react";
import Navbar, {NavbarLink} from "../Navbar";
import {useSelector} from "react-redux";
import {RootState} from "../../../state/reducer";
import {UserState} from "../../../user/state/user.reducer";
import {UserRole} from "../../../user/model/user.model";
import { useHistory } from "react-router-dom";

const NavbarContainer: React.FC = () => {
    const userState = useSelector<RootState, UserState>(state => state.user);
    const history = useHistory();

    let routes: NavbarLink[] = [];
    const navigateHome = () => history.push('/');

    if (userState.loading) {
        return <Navbar onBrandClick={navigateHome} links={[]} />;
    }

    const isGuest = !userState.data;
    const isStudent = !isGuest && userState.data?.role === UserRole.STUDENT;
    const isTeacher = !isGuest && userState.data?.role === UserRole.TEACHER;

    if (isGuest) {
        routes = [
            { text: 'Login', url: '/login', type: 'link' },
            { text: 'Register', url: '/register', type: 'link' }
        ]
    } else if (isStudent) {
        routes = [
            { text: 'My Grades', url: '/profile/grades', type: 'link' },
            { text: 'Logout', url: '/logout', type: 'link' }
        ]
    } else if (isTeacher) {
        routes = [
            { text: 'Administration', url: '/administration', type: 'link' },
            { text: 'Logout', url: '/logout', type: 'link' }
        ]
    }

    return <Navbar onBrandClick={navigateHome} links={routes} />
};

export default NavbarContainer;