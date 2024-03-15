import React from 'react';
import styled from 'styled-components';


const BalanceContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const Balance = () => {
  return (
    <BalanceContainer>
      <h1>Your Balance</h1>
      <div className="balance-content">
       
      </div>
     
    </BalanceContainer>
  );
};

export default Balance;