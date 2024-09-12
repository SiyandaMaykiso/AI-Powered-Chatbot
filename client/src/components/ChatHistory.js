

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress'; 
import './ChatHistory.css'; 

const ChatHistory = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(''); 

  useEffect(() => {
    
    const fetchChatHistory = async () => {
      const token = localStorage.getItem('token'); 

      if (!token) {
        setError('No token found. Redirecting to login...');
        setLoading(false);
        
        window.location.href = '/login'; 
        return;
      }

      try {
        const response = await axios.get('https://ai-powered-chatbot-c163b8863896.herokuapp.com/chathistory', {  
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setChatHistory(response.data.chatHistory);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          
          setError('Unauthorized. Please log in again.');
          localStorage.removeItem('token'); 
          window.location.href = '/login';  
        } else {
          console.error('Error fetching chat history:', error);
          setError('Error fetching chat history. Please try again.');
        }
      } finally {
        setLoading(false); 
      }
    };

    fetchChatHistory();
  }, []);

  return (
    <div>
      <h2>Your Chat History</h2>

      
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