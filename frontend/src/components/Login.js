import React, { useState } from 'react';
import api from '../utils/api'
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // send login request to backend
      const response = await api.post('/api/auth/login', {
        username,
        password,
      });
      
      alert('Login successful!');

      // store JWT token in localStorage
      localStorage.setItem('token', response.data.token);
      
      // redirect to dashboard
      window.location = '/dashboard';
    } catch (error) {
      alert('Login failed!');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
      <p style={{ marginTop: '20px' }}>
        Don't have an account? <Link to="/register">Sign up here!</Link>
      </p>
    </div>
  );
};

export default Login;