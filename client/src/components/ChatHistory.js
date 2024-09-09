// /client/src/components/ChatHistory.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress'; // Import the CircularProgress component
import './ChatHistory.css'; // Import the CSS file

const ChatHistory = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch chat history when the component mounts
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get('/chat-history', {  // Use relative URL
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Pass the JWT token for authentication
          },
        });
        setChatHistory(response.data.chatHistory);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching chat history:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchChatHistory();
  }, []);

  return (
    <div>
      <h2>Your Chat History</h2>

      {/* Show the CircularProgress spinner while loading */}
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </div>
      ) : (
        <ul>
          {chatHistory.map((log, index) => (
            <li key={index} className="chat-result">
              <strong>You:</strong> {log.message} <br />
              <strong>Bot:</strong> {log.response}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatHistory;