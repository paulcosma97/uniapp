import React from "react";
import Container from "react-bootstrap/Container";
import NavbarContainer from "../navbar/container/NavbarContainer";

interface LayoutProps {
    navbarHidden?: boolean
}

const Layout: React.FC<LayoutProps> = props => (
    <>
        {props.navbarHidden || <NavbarContainer />}
        <Container fluid>

            {props.children}
        </Container>
    </>
)

export default Layout;