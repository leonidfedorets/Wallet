import React, { useState } from 'react';
import styled from 'styled-components';
import ConvertForm from './components/Wallet/ConvertForm';
import SendForm from './components/Wallet/SendForm';
import TransactionHistory from './components/TransactionHistory/TransactionHistory';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Balance from './components/balance/balance';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const AuthContainer = styled.div`
  padding: 10px;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const AuthButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const LogoutButton = styled(AuthButton)`
  background-color: red;
`;

const Modal = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  padding-top: 100px;
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 100%;
  max-width: 300px;
  border-radius: 5px;
`;

const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
`;

const App = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const openRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const closeRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const handleLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setUsername('');
    setIsLoggedIn(false);
  };

  return (
    <AppContainer>
     
      <AuthContainer>
        {isLoggedIn ? (
          <>
            <p>Welcome, {username}!</p>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        ) : (
          <>
            <AuthButton onClick={openLoginModal}>Login</AuthButton>
            <AuthButton onClick={openRegisterModal}>Register</AuthButton>
          </>
        )}
      </AuthContainer>
      <Balance/>
      <div className="wallet-container">
        <h1>Your Wallet</h1>
        <div className="wallet-content">
          <ConvertForm />
          <SendForm />
        </div>
        <TransactionHistory />
      </div>

      <Modal show={showLoginModal}>
        <ModalContent>
          <CloseButton onClick={closeLoginModal}>&times;</CloseButton>
          <Login onLogin={handleLogin} />
        </ModalContent>
      </Modal>

      <Modal show={showRegisterModal}>
        <ModalContent>
          <CloseButton onClick={closeRegisterModal}>&times;</CloseButton>
          <Register />
        </ModalContent>
      </Modal>
    </AppContainer>
  );
};

export default App;

