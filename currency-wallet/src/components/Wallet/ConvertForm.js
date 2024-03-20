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
  width:400px;
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

const ConvertForm = () => {
    const { wallet, updateWallet } = useWallet();
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [convertedAmount, setConvertedAmount] = useState(null);
  
    const handleConvert = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/af76ca720d7763e3b0cc6fd9/pair/${fromCurrency}/${toCurrency}/${amount}`
        );
  
        if (response.data.result === 'success') {
          const convertedAmountValue = response.data.conversion_result;
          setConvertedAmount(convertedAmountValue);
          const updatedWallet = { ...wallet, [toCurrency]: convertedAmountValue };
          updateWallet(updatedWallet);
          console.log(`Converted Amount: ${convertedAmountValue}`);
        } else {
          console.error('Failed to convert currency');
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <FormContainer onSubmit={handleConvert} className="convert-form">
        <h3>Convert Currency</h3>
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
          <Label htmlFor="fromCurrency">From Currency:</Label>
          <Select
            id="fromCurrency"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
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
          <Label htmlFor="toCurrency">To Currency:</Label>
          <Select
            id="toCurrency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="CAD">CAD</option>
            <option value="AUD">AUD</option>
            <option value="SGD">SGD</option>
            <option value="CHF">CHF</option>
            <option value="EUR">EUR</option>
          </Select>
        </FormGroup>
        <Button type="submit">Convert</Button>
  
        {convertedAmount !== null && (
          <div className="converted-amount">
            Converted Amount: {convertedAmount}
          </div>
        )}
      </FormContainer>
    );
  };
  
  export default ConvertForm;