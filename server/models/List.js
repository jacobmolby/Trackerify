const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 255
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  created: {
    type: Date,
    default: Date.now
  },
  color: {
    type: String,
    default: '#00b6f3'
  }
});

module.exports = mongoose.model('List', listSchema);
