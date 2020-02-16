import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "../components/HomePage";
import LoginPage from "../components/LoginPage";
import SignupPage from "../components/SignupPage";
<<<<<<< HEAD
//import getValidationSchema-yup from "../components/SignupPage/getValidationSchema";
||||||| merged common ancestors

=======
import HelloWorld from "../components/HelloWorld";
>>>>>>> a46d7880cc6bc47cca119260a8801992c545c905

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