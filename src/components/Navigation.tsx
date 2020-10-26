import React, {useContext, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {AuthContext} from "../context/auth-context";
import {authorizedAction, unauthorizedAction} from "../context/auth-actions";

function Navigation() {
    const {state, dispatch} = useContext(AuthContext);
    useEffect(() => {
        dispatch(authorizedAction());
    }, []);

    return (
        <nav className="navbar navbar-expand-xl navbar-dark bg-dark fixed-top">
            <li><Link className="navbar-brand nav-link"
                      to="/" onClick={() => {
                          dispatch(authorizedAction());
            }}> Home </Link></li>
            {!state.isAuthenticated && (
                <li><Link className="navbar-brand nav-link" to="/auth"> Account </Link></li>
            )}
            {state.isAuthenticated && (
                <li><Link className="navbar-brand nav-link" to="/create"> Create </Link></li>
            )}
            {state.isAuthenticated && (
                <li><Link className="navbar-brand nav-link"
                          to="/auth"
                          onClick={() => {
                              window.localStorage.clear();
                              dispatch(unauthorizedAction());
                          }}
                > Logout </Link></li>
            )}

            <div className="collapse navbar-collapse bg-dark" id="navbarSupportedContent">
                <ul className="navbar-nav navbar-brand mr-auto">
                    <li className="nav-item"></li>
                </ul>

                <ul className="navbar-nav navbar-brand">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <strong>TBD</strong>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <div className="px-2">Hello</div>
                            {/*<form className="px-2 py-2">*/}
                            {/*    <div className="form-group">*/}
                            {/*        <label htmlFor="exampleDropdownFormEmail1">Email address</label>*/}
                            {/*        <input type="email" className="form-control" id="exampleDropdownFormEmail1"*/}
                            {/*               placeholder="email@example.com"/>*/}
                            {/*    </div>*/}
                            {/*    <div className="form-group">*/}
                            {/*        <label htmlFor="exampleDropdownFormPassword1">Password</label>*/}
                            {/*        <input type="password" className="form-control" id="exampleDropdownFormPassword1"*/}
                            {/*               placeholder="Password"/>*/}
                            {/*    </div>*/}
                            {/*    <div className="form-group">*/}
                            {/*        <div className="form-check">*/}
                            {/*            <input type="checkbox" className="form-check-input" id="dropdownCheck"/>*/}
                            {/*            <label className="form-check-label" htmlFor="dropdownCheck">*/}
                            {/*                Remember me*/}
                            {/*            </label>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <button type="submit" className="btn btn-primary mt-0 mb-0">Sign in</button>*/}
                            {/*</form>*/}
                            {/*<div className="dropdown-divider"></div>*/}
                            {/*<a className="dropdown-item" href="#">New around here? Sign up</a>*/}
                            {/*<a className="dropdown-item" href="#">Forgot password?</a>*/}
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default withRouter(Navigation);