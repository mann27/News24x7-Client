import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import IndexRoutes from './routes/index.js';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="content" style={{ marginTop: '10px' }}>
          <IndexRoutes />
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
