// Create a Header Component
// /client/src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1>AI-Powered Chatbot</h1>
      <nav>
        <Link to="/chat" style={linkStyle}>Chat</Link>
        <Link to="/history" style={linkStyle}>Chat History</Link>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/register" style={linkStyle}>Register</Link>
      </nav>
    </header>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#282c34',
  color: 'white',
};

const linkStyle = {
  marginRight: '10px',
  color: 'white',
  textDecoration: 'none',
};

export default Header;
