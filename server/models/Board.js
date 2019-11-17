const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 255
  },
  color: {
    type: String,
    default: '#00c1e0'
  },
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Board', boardSchema);
