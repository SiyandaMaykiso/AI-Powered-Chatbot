

import React, { useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress'; 
import { Link } from 'react-router-dom'; 

const ChatWindow = () => {
  const [userQuery, setUserQuery] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false); 

  const sendMessage = async () => {
    if (userQuery.trim()) {
      setLoading(true); 
      try {
        const response = await axios.post('/chat', {  
          message: userQuery,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` 
          }
        });
        setChatLog([...chatLog, { user: 'You', message: userQuery }, { user: 'Bot', message: response.data.response }]);
        setUserQuery('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
      setLoading(false); 
    }
  };

  
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
          onKeyPress={handleKeyPress} 
          style={inputStyle}
        />
        <button onClick={sendMessage} style={sendButtonStyle} disabled={loading}>
          {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Send'}
        </button>
      </div>
      {}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link to="/chathistory">
          <button style={historyButtonStyle}>View Chat History</button>
        </Link>
      </div>
    </div>
  );
};


const chatContainerStyle = {
  maxWidth: '864px',  
  margin: '0 auto',
  padding: '28px',  
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
  height: '432px',  
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
  width: '84%',
  padding: '11px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const sendButtonStyle = {
  padding: '12px 24px',
  backgroundColor: '#007bff',
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.1rem',  
};

const historyButtonStyle = {
  padding: '12px 24px',  
  backgroundColor: '#28a745',
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer',
  border: 'none',
  fontSize: '1.1rem',  
};

export default ChatWindow;