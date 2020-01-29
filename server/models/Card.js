const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 255
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
    required: true
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },
  description: {
    type: String,
    required: false
  },
  archived: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  labels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Label' }],
  assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' }],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Card', cardSchema);
