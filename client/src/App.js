// /client/src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChatWindow from './components/ChatWindow';
import Login from './components/Login';
import Register from './components/Register'; 
import Home from './components/Home'; 
import ChatHistory from './components/ChatHistory'; 
import Header from './components/Header'; 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if a token exists in localStorage on initial render
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        {/* Add the Header component */}
        <Header />

        <Routes>
          {/* Default Home route */}
          <Route path="/" element={<Home onLoginSuccess={handleLoginSuccess} />} />

          {/* Login and Register routes */}
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<Register />} />

          {/* Protected ChatWindow and ChatHistory routes */}
          {isLoggedIn ? (
            <>
              <Route path="/chat" element={<ChatWindow />} />
              <Route path="/chat-history" element={<ChatHistory />} />
            </>
          ) : (
            // If not logged in, redirect to the login page
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
