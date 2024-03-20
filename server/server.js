const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const authRoutes = require('./routes/auth');
const walletRoutes = require('./routes/wallet');
const userRoutes = require('./routes/user'); // Import user routes

app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/user', userRoutes); // Use user routes

const Transaction = require('./models/Transaction');

// Handle POST request to create a new transaction
app.post('/api/wallet/send', async (req, res) => {
  const { sender, receiver, amount, currency } = req.body;

  try {
    // Check if sender and receiver are provided
    if (!sender || !receiver) {
      return res.status(400).json({ error: 'Sender and receiver are required' });
    }

    // Create a new transaction
    const newTransaction = new Transaction({
      sender,
      receiver,
      amount,
      currency,
    });

    // Save the transaction to the database
    await newTransaction.save();

    return res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
