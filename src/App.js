import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from "react-router-dom";
import AuthRoute from './routes/authRoute';
import jwtDecode from 'jwt-decode'
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HelloWorld from './components/HelloWorld';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import HomePage from './components/HomePage';


let authenticated = false;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken)
  if (decodedToken.exp * 1000 < Date.now()) {
    alert(decodedToken.exp * 1000 < Date.now())
    authenticated = false
    window.location.href = '/login'
  }
  else {
    authenticated = true
  }
}

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="content" style={{ marginTop: '10px' }}>
          <Switch>
            <Route path="/hello" component={HelloWorld} />
            <Route exact path="/" component={HomePage} />
            <AuthRoute path="/login" component={LoginPage} authenticated={authenticated} />
            <AuthRoute path="/signup" component={SignupPage} authenticated={authenticated} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
