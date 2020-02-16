import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import IndexRoutes from './routes/index.js';
<<<<<<< HEAD
import Navbar from './components/NavBar';
import SignupPage from './components/SignupPage'
||||||| merged common ancestors
import Navbar from './components/NavBar';
=======
import Navbar from './components/Navbar';
>>>>>>> a46d7880cc6bc47cca119260a8801992c545c905

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <IndexRoutes />
        </div>
        <SignupPage/>
      </Router>
    </div>
  );
}

export default App;
