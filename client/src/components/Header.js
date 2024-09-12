

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1>AI-Powered Chatbot</h1>
      <nav>
        <Link to="/" style={linkStyle}>Home</Link> 
        <Link to="/chat" style={linkStyle}>Chat</Link>
        <Link to="/chathistory" style={linkStyle}>Chat-History</Link> 
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
  fontWeight: 'bold', 
};

export default Header;
