import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Home = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <h1>Welcome to the AI-Powered Chatbot</h1>
      <div>
        <button onClick={() => setIsLogin(true)}>Login</button>
        <button onClick={() => setIsLogin(false)}>Register</button>
      </div>
      {/* Pass onLoginSuccess prop to Login component */}
      {isLogin ? <Login onLoginSuccess={onLoginSuccess} /> : <Register />}
    </div>
  );
};

export default Home;
