const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  UserName: { type: String, required: true, unique: true },
  Email: { type: String, required: true, unique: true },
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  AccountType: { type: String, enum: ['Admin', 'User'], required: true },
  PhoneNumber: { type: String, required: true },
  PasswordHash: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
