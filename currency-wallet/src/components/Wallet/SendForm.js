import React, { useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { TransactionContext } from '../../context/TransactionContext';

const FormContainer = styled.form`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 95%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.p`
  margin-top: 10px;
  color: ${(props) => (props.error ? 'red' : 'green')};
`;

const SendForm = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [recipientId, setRecipientId] = useState('');
  const [senderId, setSenderId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { transactions, setTransactions } = useContext(TransactionContext);

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        amount: parseInt(amount),
        currency: currency,
        sender: senderId,
        receiver: recipientId,
      };

      const response = await axios.post(
        'http://localhost:4000/api/wallet/send',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const newTransaction = response.data.transaction;

      setTransactions([...transactions, newTransaction]);

      setMessage('Transaction sent successfully');
      setError('');
      setAmount('');
      setCurrency('USD');
      setRecipientId('');
      setSenderId('');
    } catch (error) {
      console.error(error);
      setMessage('');
      setError('Error sending transaction. Please try again.');
    }
  };

  return (
    <FormContainer onSubmit={handleSend} className="send-form">
      <h3>Send Currency</h3>
      {message && <Message>{message}</Message>}
      {error && <Message error>{error}</Message>}
      <FormGroup>
        <Label htmlFor="amount">Amount:</Label>
        <Input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="currency">Currency:</Label>
        <Select
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="CAD">CAD</option>
          <option value="AUD">AUD</option>
          <option value="SGD">SGD</option>
          <option value="CHF">CHF</option>
          <option value="EUR">EUR</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="recipientId">Recipient ID:</Label>
        <Input
          type="text"
          id="recipientId"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="senderId">Sender ID:</Label>
        <Input
          type="text"
          id="senderId"
          value={senderId}
          onChange={(e) => setSenderId(e.target.value)}
          required
        />
      </FormGroup>
      <Button type="submit">Send</Button>
    </FormContainer>
  );
};

export default SendForm;


