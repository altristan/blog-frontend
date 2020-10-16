import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {useAuth} from "../context/auth-context";
function Navbar() {
    const {isAuthenticated} = useAuth();
    return (
        <header>
            <div className="container-fluid position-relative no-side-padding">
                <ul className="main-menu visible-on-click" id="main-menu">
                    <li><Link className={"nav-link"} to={"/auth"}> Register/Login </Link></li>
                    <li><Link className={"nav-link"} to={"/"}> Home </Link></li>
                    {isAuthenticated && (
                        <li><Link className={"nav-link"} to={"/create"}> Create </Link></li>
                    )}
                </ul>
            </div>
        </header>
    );
}
export default withRouter(Navbar);