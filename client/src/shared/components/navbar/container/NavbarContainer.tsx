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
            { text: 'Logare', url: '/login', type: 'link' },
            { text: 'Înregistrare', url: '/register', type: 'link' }
        ];
        const authenticatedRoutes: NavbarLink[] = [
            ...publicRoutes,
            { text: 'Delogare', url: '/logout', type: 'link', onClick: () => dispatch(logoutUser()) }
        ];
        const studentRoutes: NavbarLink[] = [
            { text: 'Note', url: '/profile/grades', type: 'link' },
            ...authenticatedRoutes,
        ];
        const teacherRoutes: NavbarLink[] = [
            { text: 'Administrare', url: '/administration', type: 'link' },
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


    }, [userState, dispatch]);

    useEffect(() => {
        setActiveLink(
            routes
                .filter(isSimpleLink)
                .find((route: SimpleLink) => history.location.pathname.includes(route.url)
            )
        )
    }, [history.location.pathname, routes]);

    return <Navbar activeLink={activeLink} onBrandClick={navigateHome} links={routes} />
};

export default NavbarContainer;