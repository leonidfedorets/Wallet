// Updated Login Component

import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const AuthInput = styled.input`
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const AuthButton = styled.button`
  padding: 10px;
  margin: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  margin: 5px 0;
`;

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        username,
        password,
      });
      console.log(response.data);
      // Clear input fields on successful login
      setUsername('');
      setPassword('');
      // Call onLogin function to handle further actions
      onLogin(username);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <AuthForm onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Username:</label>
        <AuthInput
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <AuthInput
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <AuthButton type="submit">Login</AuthButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </AuthForm>
  );
};

export default Login;

