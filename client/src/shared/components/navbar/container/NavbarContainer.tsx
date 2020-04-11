import React, {useEffect, useState} from "react";
import Navbar, {isSimpleLink, NavbarLink, SimpleLink} from "../Navbar";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../state/reducer";
import {UserState} from "../../../user/state/user.reducer";
import {UserRole} from "../../../user/model/user.model";
import {useHistory} from "react-router-dom";
import {logoutUser} from "../../../user/state/user.actions";

const NavbarContainer: React.FC = () => {
    const userState = useSelector<RootState, UserState>(state => state.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [routes, setRoutes] = useState<NavbarLink[]>([]);
    const [activeLink, setActiveLink] = useState<SimpleLink>();

    const navigateHome = () => history.push('/');

    useEffect(() => {
        const publicRoutes: NavbarLink[] = [];
        const guestRoutes: NavbarLink[] = [
            ...publicRoutes,
            { text: 'Login', url: '/login', type: 'link' },
            { text: 'Register', url: '/register', type: 'link' }
        ];
        const authenticatedRoutes: NavbarLink[] = [
            ...publicRoutes,
            { text: 'Logout', url: '/logout', type: 'link', onClick: () => dispatch(logoutUser()) }
        ];
        const studentRoutes: NavbarLink[] = [
            { text: 'My Grades', url: '/profile/grades', type: 'link' },
            ...authenticatedRoutes,
        ];
        const teacherRoutes: NavbarLink[] = [
            { text: 'Administration', url: '/administration', type: 'link' },
            ...authenticatedRoutes,
        ];

        const isGuest = !userState.data;
        const isStudent = !isGuest && userState.data?.role === UserRole.STUDENT;
        const isTeacher = !isGuest && userState.data?.role === UserRole.TEACHER;

        if (isGuest) {
            setRoutes(guestRoutes);
        } else if (isStudent) {
            setRoutes(studentRoutes);
        } else if (isTeacher) {
            setRoutes(teacherRoutes);
        }

        setActiveLink([...teacherRoutes, ...teacherRoutes, ...guestRoutes]
            .filter(isSimpleLink)
            .find((route: SimpleLink) => history.location.pathname.includes(route.url)))
    }, [userState, dispatch, history]);

    return <Navbar activeLink={activeLink} onBrandClick={navigateHome} links={routes} />
};

export default NavbarContainer;