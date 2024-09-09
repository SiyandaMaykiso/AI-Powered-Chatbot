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
  const [loading, setLoading] = useState(true); // To prevent routing before token check is done

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Token exists, user is logged in
    }
    setLoading(false); // Token check completed
  }, []);

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while token is being checked
  }

  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          {/* Pass onLoginSuccess to Home component */}
          <Route path="/" element={<Home onLoginSuccess={handleLoginSuccess} />} />

          {/* Public routes */}
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          {/* Pass onLoginSuccess to Register component */}
          <Route path="/register" element={<Register onLoginSuccess={handleLoginSuccess} />} />

          {/* Protected routes */}
          {isLoggedIn ? (
            <>
              <Route path="/chat" element={<ChatWindow />} />
              <Route path="/chat-history" element={<ChatHistory />} />
            </>
          ) : (
            // Redirect to login if user is not authenticated
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;