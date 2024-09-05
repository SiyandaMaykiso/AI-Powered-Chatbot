import React, { useState } from 'react';
import axios from 'axios';

const ChatWindow = () => {
  const [userQuery, setUserQuery] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const sendMessage = async () => {
    if (userQuery.trim()) {
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
    }
  };

  return (
    <div>
      <div className="chat-window">
        {chatLog.map((entry, index) => (
          <div key={index}>
            <strong>{entry.user}:</strong> {entry.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userQuery}
        onChange={(e) => setUserQuery(e.target.value)}
        placeholder="Ask the chatbot..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatWindow;
