import React, { useState } from 'react';
import axios from 'axios';
import { useWallet } from '../../context/WalletContext';
import styled from 'styled-components';

const FormContainer = styled.form`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 90%;
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

const SendForm = () => {
  const { wallet, updateWallet } = useWallet();
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [recipientId, setRecipientId] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/wallet/send', {
        amount,
        currency,
        recipientId,
      });
      updateWallet(response.data.wallet);
      setAmount('');
      setRecipientId('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormContainer onSubmit={handleSend} className="send-form">
      <h3>Send Currency</h3>
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
      <Button type="submit">Send</Button>
    </FormContainer>
  );
};

export default SendForm;
