const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String},
  email: { type: String, required: true, unique: true },
  location: { type: String},
  password: { type: String}
});

const User = mongoose.model('User', userSchema);

module.exports = User;