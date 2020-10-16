import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./components/users/Login";
import Home from "./components/Home";
import Post from "./components/post/Post";
import Edit from "./components/post/Edit";
import Create from "./components/post/Create";
import Navbar from "./components/Navbar";
import {Route, Switch} from "react-router";
import Auth from "./components/users/Auth";
import Register from "./components/users/Register";

function App(): JSX.Element {
  return (
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
  );
}

export default App;
