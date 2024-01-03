const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Email field with uniqueness constraint
  username: { type: String, required: true, unique: true }, // Username field with uniqueness constraint
  password: { type: String, required: true }, // Password field
});

// Mongoose model for User based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
