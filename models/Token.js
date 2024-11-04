const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['auth', 'reset', 'verification'], 
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: '1h' },
  },
});

module.exports = mongoose.model("Token", tokenSchema);
