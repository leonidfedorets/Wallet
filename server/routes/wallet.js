const express = require('express');
const router = express.Router();
const axios = require('axios');
const Transaction = require('../models/Transaction');

// POST route for converting currency
router.post('/convert', async (req, res) => {
  try {
    const { fromCurrency, toCurrency, amount } = req.body;
    const apiKey = 'af76ca720d7763e3b0cc6fd9';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`;

    const response = await axios.get(apiUrl);

    if (response.data.result === 'success') {
      const convertedAmount = response.data.conversion_result;
      res.json({ convertedAmount });
    } else {
      res.status(400).json({ error: 'Failed to convert currency' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// POST route for sending currency
router.post('/send', async (req, res) => {
  const { sender, receiver, amount, currency } = req.body;

  try {
    // Check if sender and receiver are provided
    if (!sender || !receiver) {
      return res.status(400).json({ error: 'Sender and receiver are required' });
    }

    const newTransaction = new Transaction({
      sender,
      receiver,
      amount,
      currency,
    });

    await newTransaction.save();

    res.status(201).json({ message: 'Transaction sent successfully', transaction: newTransaction });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});

router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json({ transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});


module.exports = router;
