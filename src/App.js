import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import AuthRoute from "./routes/authRoute";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "./App.css";
//REDUX
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

//Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import HelloWorld from "./components/HelloWorld";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import HomePage from "./components/HomePage";
import HelpPage from "./components/HelpPage";
import PostDetails from "./components/HomePage/Post/PostDetails";
import userPage from "./components/UserPage";
import InvalidPage from "./components/404Page";

axios.defaults.baseURL = "https://asia-east2-news-sen3.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <Provider store={store}>
      <ToastContainer autoClose={8000} />
      <div className="App">
        <Router>
          <Navbar />
          <div
            className="content"
            style={{ minHeight: "calc(100vh - 115px)", PaddingBottom: "20px" }}
          >
            <Switch>
              <Route path="/hello" component={HelloWorld} />
              <Route path="/help" component={HelpPage} />
              <Route exact path="/news24x7" component={LandingPage} />
              <Route exact path="/" component={HomePage} />
              <AuthRoute path="/login" component={LoginPage} />
              <AuthRoute path="/signup" component={SignupPage} />
              <Route path="/post/:postId" component={PostDetails} />
              <Route path="/user/:handle" component={userPage} />
              <Route path="*" component={InvalidPage} />
            </Switch>
          </div>
          <Footer />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
