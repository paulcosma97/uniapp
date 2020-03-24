import React from "react";
import Container from "react-bootstrap/Container";


const Layout: React.FC = props => (
    <Container fluid>
        {props.children}
    </Container>
);

export default Layout;