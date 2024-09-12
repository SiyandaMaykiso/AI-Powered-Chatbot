

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress'; 

const Register = ({ onLoginSuccess, onLoading }) => {  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); 
    if (onLoading) onLoading(true);  
    setError('');

    try {
      const response = await axios.post('/register', {  
        username,
        password,
      });

     
      const { token } = response.data;

      
      localStorage.setItem('token', token);

      
      onLoginSuccess();  

      
      navigate('/chat');
      
    } catch (err) {
      setError('Registration error');
      console.error('Registration error:', err);
    } finally {
      setLoading(false); 
      if (onLoading) onLoading(false);  
    }
  };

  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister(e);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyPress={handleKeyPress} 
        required
        autocomplete="username"  
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={handleKeyPress} 
        required
        autocomplete="new-password"  
      />
      <button type="submit" disabled={loading}>
        {loading ? <CircularProgress size={20} /> : 'Register'}
      </button>
    </form>
  );
};

export default Register;