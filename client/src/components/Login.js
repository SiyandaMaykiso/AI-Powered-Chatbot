import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      onLoginSuccess();
    } catch (err) {
      setError('Invalid username or password');
      console.error('Login error:', err);
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
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
