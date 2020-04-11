import React from "react";
import {Link} from "react-router-dom";
import { Menu } from "antd";
import './Navbar.css';

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
    activeLink?: SimpleLink;
    onBrandClick: () => void;
}

export const isSimpleLink = (navbarLink: NavbarLink): navbarLink is SimpleLink => 'type' in navbarLink && navbarLink.type === 'link';

const Navbar: React.FC<NavbarProps> = props => {
    const menuStyle: React.CSSProperties = {
        gridTemplateColumns: '0 ' + (props.links.map(() => '1fr').join(' '))
    };

    return (
        <Menu selectedKeys={props.activeLink ? [props.activeLink.url] : []} mode="horizontal" className="custom-antd-menu-override" style={menuStyle} >
            {props.links.filter(isSimpleLink)
                .map((link: SimpleLink) => (
                    <Menu.Item key={link.url}>
                        <Link onClick={link.onClick} key={link.url} className="nav-link" to={link.url}>{link.text}</Link>
                    </Menu.Item>
                ))}
        </Menu>
    )
};

export default Navbar;