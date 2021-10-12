import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid d-flex align-items-center justify-content-space-between">
                    <a className="navbar-brand" href="#">
                        <img style={{width:"60%"}} src="https://cdn.grapedrop.com/u5129d9550ab64e5a8a9dd4793644e5e7/714a528bf62f4d1aa0eb507da72fe9ee_electricglide.png" />
                    </a>
                    <div className="d-flex">
                        <NavItem>
                            <NavLink href="/components/">gepitemtagmanager</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/components/">Create Screen</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/components/">Catalog</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/components/">Search</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/components/">Login</NavLink>
                        </NavItem>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;

