const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 255
  },
  description: {
    type: String,
    required: false
  },
  assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attachment" }],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Card", cardSchema);
