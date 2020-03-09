import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "../components/HomePage";
import LoginPage from "../components/LoginPage";
import SignupPage from "../components/SignupPage";

import HelloWorld from "../components/HelloWorld";

const IndexRoutes = () => {
    return (
        <Switch>
            <Route path="/hello" component={HelloWorld} />
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
        </Switch>
    );
};

export default IndexRoutes;