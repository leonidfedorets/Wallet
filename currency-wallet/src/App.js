// import React, { useState } from 'react';
// import styled from 'styled-components';
// import ConvertForm from './components/Wallet/ConvertForm';
// import SendForm from './components/Wallet/SendForm';
// import TransactionHistory from './components/TransactionHistory/TransactionHistory';
// import Login from './components/auth/Login';
// import Register from './components/auth/Register';
// import Balance from './components/balance/balance';
// import { WalletProvider } from './context/WalletContext';
// import { TransactionProvider } from './context/TransactionContext';

// const AppContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
// `;

// const AuthContainer = styled.div`
//   padding: 10px;
//   justify-content: space-between;
//   width: 100%;
//   margin-bottom: 20px;
// `;

// const AuthButton = styled.button`
//   padding: 10px;
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;
// `;

// const LogoutButton = styled(AuthButton)`
//   background-color: red;
// `;

// const Modal = styled.div`
//   display: ${(props) => (props.show ? 'block' : 'none')};
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   z-index: 1;
//   padding-top: 100px;
// `;

// const ModalContent = styled.div`
//   background-color: #fefefe;
//   margin: auto;
//   padding: 20px;
//   border: 1px solid #888;
//   width: 100%;
//   max-width: 300px;
//   border-radius: 5px;
// `;

// const CloseButton = styled.span`
//   color: #aaa;
//   float: right;
//   font-size: 28px;
//   font-weight: bold;
//   cursor: pointer;
// `;

// const TransactionHistoryContainer = styled.div`
//   width: 100%;
// `;

// const App = () => {
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [showRegisterModal, setShowRegisterModal] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState('');
//   const [userId, setUserId] = useState('');
//   const [calculatedBalance, setCalculatedBalance] = useState(0);

//   const openLoginModal = () => {
//     setShowLoginModal(true);
//   };

//   const closeLoginModal = () => {
//     setShowLoginModal(false);
//   };

//   const openRegisterModal = () => {
//     setShowRegisterModal(true);
//   };

//   const closeRegisterModal = () => {
//     setShowRegisterModal(false);
//   };

//   const handleLogin = (username) => {
//     setUsername(username);
//     setIsLoggedIn(true);
//     setShowLoginModal(false);
//   };

//   const handleLogout = () => {
//     setUsername('');
//     setIsLoggedIn(false);
//   };

//   const handleUserIdChange = (e) => {
//     setUserId(e.target.value);
//   };

//   const calculateBalance = () => {
//     // Replace this with your logic to fetch transactions for the user from the API
//     // For now, we are setting a static value
//     const totalBalance = 5000;
//     setCalculatedBalance(totalBalance);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     calculateBalance();
//   };

//   return (
//     <WalletProvider>
//       <TransactionProvider>
//         <AppContainer>
//           <AuthContainer>
//             {isLoggedIn ? (
//               <>
//                 <p>Welcome, {username}!</p>
//                 <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
//               </>
//             ) : (
//               <>
//                 <AuthButton onClick={openLoginModal}>Login</AuthButton>
//                 <AuthButton onClick={openRegisterModal}>Register</AuthButton>
//               </>
//             )}
//           </AuthContainer>

//           <div>
//               <Balance/>
//           </div>

//           <div className="wallet-container">
//             <h1>Your Wallet</h1>
//             <div className="wallet-content">
//               <ConvertForm />
//               <SendForm />
//             </div>
//           </div>

//           <TransactionHistoryContainer>
//             <h2>Transaction History</h2>
//             <TransactionHistory />
//           </TransactionHistoryContainer>

//           <Modal show={showLoginModal}>
//             <ModalContent>
//               <CloseButton onClick={closeLoginModal}>&times;</CloseButton>
//               <Login onLogin={handleLogin} />
//             </ModalContent>
//           </Modal>

//           <Modal show={showRegisterModal}>
//             <ModalContent>
//               <CloseButton onClick={closeRegisterModal}>&times;</CloseButton>
//               <Register />
//             </ModalContent>
//           </Modal>
//         </AppContainer>
//       </TransactionProvider>
//     </WalletProvider>
//   );
// };

// export default App;
import React, { useState } from 'react';
import styled from 'styled-components';
import ConvertForm from './components/Wallet/ConvertForm';
import SendForm from './components/Wallet/SendForm';
import TransactionHistory from './components/TransactionHistory/TransactionHistory';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Balance from './components/balance/balance';
import { WalletProvider } from './context/WalletContext';
import { TransactionProvider } from './context/TransactionContext';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const AuthContainer = styled.div`
  padding: 10px;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const AuthButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-left: 10px;
`;

const LogoutButton = styled(AuthButton)`
  background-color: #007bff;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
`;

const Username = styled.p`
  margin: 0;
  position: absolute;
  top: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 5px;
  border-radius: 3px;
  display: none;
  ${Avatar}:hover & {
    display: block;
  }
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

const TransactionHistoryContainer = styled.div`
  width: 100%;
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
    <WalletProvider>
      <TransactionProvider>
        <AppContainer>
          <AuthContainer>
            {isLoggedIn ? (
              <>
                <Avatar>
                  {username && <Username>{username.charAt(0).toUpperCase()}</Username>}
                </Avatar>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
              </>
            ) : (
              <>
                <AuthButton onClick={openLoginModal}>Login</AuthButton>
                <AuthButton onClick={openRegisterModal}>Register</AuthButton>
              </>
            )}
          </AuthContainer>

          <Balance />

          <div className="wallet-container">
            <h1>Your Wallet</h1>
            <div className="wallet-content">
              <ConvertForm />
              <SendForm />
            </div>
          </div>

          <TransactionHistoryContainer>
            <h2>Transaction History</h2>
            <TransactionHistory />
          </TransactionHistoryContainer>

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
      </TransactionProvider>
    </WalletProvider>
  );
};

export default App;





