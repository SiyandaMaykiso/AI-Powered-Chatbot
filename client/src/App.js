

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
  const [loading, setLoading] = useState(true); 
  const [globalLoading, setGlobalLoading] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); 
    }
    setLoading(false); 
  }, []);

  
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Router>
      <div className="App">
        <Header />
        
        {globalLoading && <div>Loading...</div>} 

        <Routes>
          
          <Route path="/" element={<Home onLoginSuccess={handleLoginSuccess} onLoading={setGlobalLoading} />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} onLoading={setGlobalLoading} />} />
          <Route path="/register" element={<Register onLoginSuccess={handleLoginSuccess} onLoading={setGlobalLoading} />} /> 

          
          {isLoggedIn ? (
            <>
              <Route path="/chat" element={<ChatWindow />} />
              <Route path="/chathistory" element={<ChatHistory />} />
            </>
          ) : (
            
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;