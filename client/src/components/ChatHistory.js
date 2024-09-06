import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatHistory = () => {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Fetch chat history when the component mounts
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get('http://localhost:3001/chat-history', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Pass the JWT token for authentication
          }
        });
        setChatHistory(response.data.chatHistory);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, []);

  return (
    <div>
      <h2>Your Chat History</h2>
      <ul>
        {chatHistory.map((log, index) => (
          <li key={index}>
            <strong>You:</strong> {log.message} <br />
            <strong>Bot:</strong> {log.response}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistory;
