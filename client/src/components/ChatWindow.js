// /client/src/components/ChatWindow.js

import React, { useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const ChatWindow = () => {
  const [userQuery, setUserQuery] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const sendMessage = async () => {
    if (userQuery.trim()) {
      setLoading(true); // Set loading to true when sending the message
      try {
        const response = await axios.post('http://localhost:3001/chat', {
          message: userQuery,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store your JWT token here
          }
        });
        setChatLog([...chatLog, { user: 'You', message: userQuery }, { user: 'Bot', message: response.data.response }]);
        setUserQuery('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
      setLoading(false); // Set loading to false after the response
    }
  };

  // Function to handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div style={chatContainerStyle}>
      <h2 style={headerStyle}>AI Chat</h2>
      <div style={chatWindowStyle}>
        {chatLog.map((entry, index) => (
          <div key={index} style={entryStyle}>
            <strong>{entry.user}:</strong> {entry.message}
          </div>
        ))}
      </div>
      <div style={inputContainerStyle}>
        <input
          type="text"
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="Ask the chatbot..."
          onKeyPress={handleKeyPress} // Add keypress handler for Enter key
          style={inputStyle}
        />
        <button onClick={sendMessage} style={sendButtonStyle} disabled={loading}>
          {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Send'}
        </button>
      </div>
      {/* Add a link to the Chat History page */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link to="/chat-history">
          <button style={historyButtonStyle}>View Chat History</button>
        </Link>
      </div>
    </div>
  );
};

// Styles for ChatWindow
const chatContainerStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
};

const headerStyle = {
  textAlign: 'center',
  fontSize: '24px',
  color: '#343a40',
};

const chatWindowStyle = {
  height: '300px',
  overflowY: 'auto',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '10px',
  marginBottom: '10px',
  border: '1px solid #ddd',
};

const entryStyle = {
  margin: '10px 0',
  padding: '10px',
  backgroundColor: '#f1f3f5',
  borderRadius: '4px',
  wordWrap: 'break-word',
};

const inputContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '10px',
};

const inputStyle = {
  width: '80%',
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const sendButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const historyButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#28a745',
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer',
  border: 'none',
};

export default ChatWindow;