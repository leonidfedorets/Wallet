import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { WalletProvider } from './context/WalletContext';

ReactDOM.render(
  <React.StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
