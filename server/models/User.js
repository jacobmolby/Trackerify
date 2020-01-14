const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 4
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 8
  },
  profileImage: {
    type: String,
    default: 'https://img.icons8.com/officel/48/000000/user.png'
  },
  // boards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
