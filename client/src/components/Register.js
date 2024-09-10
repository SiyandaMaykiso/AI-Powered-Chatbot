import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress from Material-UI

const Register = ({ onRegisterSuccess, onLoading }) => {  // Use onRegisterSuccess to maintain login state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading
  const navigate = useNavigate(); // Initialize useNavigate for programmatic navigation

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner
    if (onLoading) onLoading(true);  // Optionally call onLoading to handle globally
    setError('');

    try {
      const response = await axios.post('/register', {  // Use relative URL
        username,
        password,
      });

      // Save token in localStorage after successful registration
      localStorage.setItem('token', response.data.token);

      // Call onRegisterSuccess to update the login state and redirect to /chat
      onRegisterSuccess();
      
      // Redirect to /chat after successful registration
      navigate('/chat');
      
    } catch (err) {
      setError('User already registered');
      console.error('Registration error:', err);
    } finally {
      setLoading(false); // Hide loading spinner
      if (onLoading) onLoading(false);  // Optionally call onLoading to stop globally
    }
  };

  // Function to handle Enter key press
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
        onKeyPress={handleKeyPress} // Handle Enter key
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={handleKeyPress} // Handle Enter key
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? <CircularProgress size={20} /> : 'Register'}
      </button>
    </form>
  );
};

export default Register;