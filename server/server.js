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

app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
