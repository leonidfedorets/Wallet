// src/context/WalletContext.js
import React, { createContext, useContext, useState } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState({
    USD: 0,
    CAD: 0,
    AUD: 0,
    SGD: 0,
    CHF: 0,
    EUR: 0,
  });

  const updateWallet = (newWallet) => {
    setWallet(newWallet);
  };

  return (
    <WalletContext.Provider value={{ wallet, updateWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
