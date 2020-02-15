import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import IndexRoutes from './routes/index.js';
import Navbar from './components/NavBar';
import SignupPage from './components/SignupPage'

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
