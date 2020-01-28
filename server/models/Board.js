const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 255
  },
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  labels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Label' }],
  created: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});
boardSchema.index({ title: 'text', _id: 'text' });

module.exports = mongoose.model('Board', boardSchema);
