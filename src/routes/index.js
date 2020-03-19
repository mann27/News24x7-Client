import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "../components/HomePage";
import LoginPage from "../components/LoginPage";
import SignupPage from "../components/SignupPage";

import HelloWorld from "../components/HelloWorld";
import AuthRoute from './authRoute'
import jwtDecode from 'jwt-decode'

let authenticated;
const token = localStorage.getItem('FBIdToken');
if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken)
    if (decodedToken.exp * 1000 < Date.now()) {
        window.location.href = '/login'
        authenticated = false
    }
    else {
        authenticated = true
    }
}

const IndexRoutes = () => {
    return (
        <Switch>
            <Route path="/hello" component={HelloWorld} />
            <Route exact path="/" component={HomePage} />
            <AuthRoute path="/login" component={LoginPage} authenticated={authenticated} />
            <AuthRoute path="/signup" component={SignupPage} authenticated={authenticated} />
        </Switch>
    );
};

export default IndexRoutes;