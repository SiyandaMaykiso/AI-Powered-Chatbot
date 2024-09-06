import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/register', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      onRegisterSuccess(); // Redirect to /chat after successful registration
    } catch (err) {
      setError('Error registering user');
      console.error('Registration error:', err);
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
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
