import React from "react";
import Nav from "react-bootstrap/Nav";
import BNavbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";

export interface SimpleLink {
    type: 'link';
    url: string;
    text: string;
    onClick?: () => void;
}

export interface DropdownLinks {
    type: 'dropdown';
    links: SimpleLink[];
    text: string;
}

export type NavbarLink = SimpleLink | DropdownLinks;

export interface NavbarProps {
    links: NavbarLink[];
    onBrandClick: () => void;
}

const isSimpleLink = (navbarLink: NavbarLink): navbarLink is SimpleLink => 'type' in navbarLink && navbarLink.type === 'link';

const Navbar: React.FC<NavbarProps> = props => (
    <BNavbar collapseOnSelect expand="lg" bg="light" variant="light">
        <BNavbar.Brand onClick={props.onBrandClick}>UniApp</BNavbar.Brand>
        <BNavbar.Toggle aria-controls="responsive-navbar-nav" />
        <BNavbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                {props.links.filter(isSimpleLink)
                    .map((link: SimpleLink) => <Link onClick={link.onClick} key={link.url} className="nav-link" to={link.url}>{link.text}</Link>)}
            </Nav>
        </BNavbar.Collapse>
    </BNavbar>
);

export default Navbar;