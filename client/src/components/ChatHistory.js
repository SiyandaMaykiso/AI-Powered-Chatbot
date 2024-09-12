// /client/src/components/ChatHistory.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress'; // Import the CircularProgress component
import './ChatHistory.css'; // Import the CSS file

const ChatHistory = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(''); // Add error state

  useEffect(() => {
    // Fetch chat history when the component mounts
    const fetchChatHistory = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from local storage

      if (!token) {
        setError('No token found. Please log in.');
        setLoading(false); // Stop loading if no token
        return;
      }

      try {
        const response = await axios.get('/chathistory', {  // Use relative URL
          headers: {
            Authorization: `Bearer ${token}`, // Pass the JWT token for authentication
          },
        });
        setChatHistory(response.data.chatHistory);
      } catch (error) {
        console.error('Error fetching chat history:', error);
        setError('Error fetching chat history. Please try again.');
      } finally {
        setLoading(false); // Set loading to false after data is fetched or error occurs
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
      ) : error ? (
        <p>{error}</p>
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