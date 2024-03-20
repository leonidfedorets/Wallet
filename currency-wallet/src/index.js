import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { WalletProvider } from './context/WalletContext';
import { TransactionProvider } from './context/TransactionContext';

ReactDOM.render(
  <React.StrictMode>
    <WalletProvider>
      <TransactionProvider>
        <App />
      </TransactionProvider>
    </WalletProvider>
  </React.StrictMode>,
  document.getElementById('root')
);