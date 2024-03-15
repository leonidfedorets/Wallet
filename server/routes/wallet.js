const express = require('express');
const router = express.Router();
const axios = require('axios');

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

module.exports = router;
