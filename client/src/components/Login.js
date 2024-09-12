

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress'; 

const Login = ({ onLoginSuccess, onLoading }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); 
    onLoading(true); 
    setError('');
    try {
      const response = await axios.post('/login', {  
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      onLoginSuccess(); 
      navigate('/chat'); 
    } catch (err) {
      setError('Invalid username or password');
      console.error('Login error:', err);
    } finally {
      setLoading(false); 
      onLoading(false);  
    }
  };

  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <form onSubmit={handleLogin}>
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
        autocomplete="current-password"  
      />
      <button type="submit" disabled={loading}>
        {loading ? <CircularProgress size={20} /> : 'Login'}
      </button>
    </form>
  );
};

export default Login;