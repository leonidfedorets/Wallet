import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { TransactionContext } from '../../context/TransactionContext';

const BalanceContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const BalanceForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  label {
    margin-bottom: 10px;
  }

  input {
    padding: 8px;
    margin-bottom: 10px;
    width: 200px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const Message = styled.p`
  color: green;
  margin-top: 10px;
`;

const AmountBadge = styled.span`
  background-color: #28a745;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: bold;
  margin-top: 10px;
`;

const Balance = () => {
  const { transactions } = useContext(TransactionContext);
  const [receiverID, setReceiverID] = useState('');
  const [calculatedBalance, setCalculatedBalance] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  const handleReceiverIDChange = (e) => {
    setReceiverID(e.target.value);
    setSuccessMessage('');
  };

  const calculateBalance = () => {
    const filteredTransactions = transactions.filter(
      (transaction) => transaction.receiver === receiverID
    );

    if (filteredTransactions.length > 0) {
      const totalBalance = filteredTransactions.reduce(
        (accumulator, transaction) => accumulator + transaction.amount,
        0
      );
      setCalculatedBalance(totalBalance);
      setSuccessMessage(`Total Balance for Receiver ID ${receiverID}: ${totalBalance}`);
    } else {
      setCalculatedBalance(0);
      setSuccessMessage(`No transactions found for Receiver ID ${receiverID}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateBalance();
  };

  return (
    <BalanceContainer>
      <h2>Calculate Balance</h2>
      <BalanceForm onSubmit={handleSubmit}>
        <label htmlFor="receiverID">Enter Receiver ID: </label>
        <input
          type="text"
          id="receiverID"
          value={receiverID}
          onChange={handleReceiverIDChange}
        />
        <button type="submit">Calculate</button>
      </BalanceForm>
      {successMessage && <Message>{successMessage}</Message>}
      {calculatedBalance !== 0 && (
        <AmountBadge>Amount: {calculatedBalance}</AmountBadge>
      )}
    </BalanceContainer>
  );
};

export default Balance;
