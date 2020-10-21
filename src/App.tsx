import React, {useReducer} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./components/users/Login";
import Home from "./components/Home";
import Post from "./components/post/Post";
import Edit from "./components/post/Edit";
import Create from "./components/post/Create";
import Navbar from "./components/Navigation";
import {Route, Switch} from "react-router";
import Auth from "./components/users/Auth";
import Register from "./components/users/Register";
import {AuthContext, authReducer, INITIAL_STATE} from "./context/auth-context";

function App(): JSX.Element {
    const [authState, authDispatch] = useReducer(
        authReducer,
        INITIAL_STATE
    );

    return (
        <AuthContext.Provider value={{state: authState, dispatch: authDispatch}}>
            <div className="App">
                <Navbar/>
                <div className={'container'}>
                    <Switch>
                        <Route path={"/auth/signin"} component={Login}/>
                        <Route path={"/auth/signup"} component={Register}/>
                        <Route path={"/auth"} component={Auth}/>
                        <Route path={"/"} exact={true} component={Home}/>
                        <Route path={"/post/:postId"} component={Post}/>
                        <Route path={"/edit/:postId"} component={Edit}/>
                        <Route path={"/create"} component={Create}/>
                    </Switch>
                </div>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
