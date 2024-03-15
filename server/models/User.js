// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  wallet: {
    USD: { type: Number, default: 0 },
    CAD: { type: Number, default: 0 },
    AUD: { type: Number, default: 0 },
    SGD: { type: Number, default: 0 },
    CHF: { type: Number, default: 0 },
    EUR: { type: Number, default: 0 },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
