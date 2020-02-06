const mongoose = require('mongoose');

const listSchema = new mongoose.Schema(
  {
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

    color: {
      type: String,
      default: '#00b6f3'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('List', listSchema);
