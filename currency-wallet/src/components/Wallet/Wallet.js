import React from 'react';
import ConvertForm from './ConvertForm';
import SendForm from './SendForm';
import styled from 'styled-components';
import TransactionHistory from '../TransactionHistory/TransactionHistory';

const WalletContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const Wallet = () => {
  return (
    <WalletContainer>
      <h1>Your Wallet</h1>
      <div className="wallet-content">
        <ConvertForm />
        <SendForm />
      </div>
      <TransactionHistory />
    </WalletContainer>
  );
};

export default Wallet;
