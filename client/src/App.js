import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import Login from './components/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if a token exists in localStorage on initial render
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <h1>AI-Powered Chatbot</h1>
      {isLoggedIn ? <ChatWindow /> : <Login onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
};

export default App;
