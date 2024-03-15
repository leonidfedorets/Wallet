import React from 'react';
import styled from 'styled-components';

const HistoryContainer = styled.div`
  margin-top: 20px;
`;

const HistoryHeader = styled.h2`
  margin-bottom: 10px;
`;

const HistoryList = styled.ul`
  list-style: none;
  padding: 0;
`;

const HistoryItem = styled.li`
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 10px;
`;

const Amount = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const Date = styled.span`
  color: #777;
`;

const TransactionHistory = () => {
  // Assume transactions is an array of transaction objects
  const transactions = [
    { id: 1, amount: 50, currency: 'USD', date: '2024-03-10' },
    { id: 2, amount: 100, currency: 'EUR', date: '2024-03-09' },
    { id: 3, amount: 75, currency: 'CAD', date: '2024-03-08' },
  ];

  return (
    <HistoryContainer className="transaction-history">
      <HistoryHeader>Transaction History</HistoryHeader>
      <HistoryList>
        {transactions.map((transaction) => (
          <HistoryItem key={transaction.id}>
            <Amount>{transaction.amount} {transaction.currency}</Amount>
            <Date>{transaction.date}</Date>
          </HistoryItem>
        ))}
      </HistoryList>
    </HistoryContainer>
  );
};

export default TransactionHistory;

