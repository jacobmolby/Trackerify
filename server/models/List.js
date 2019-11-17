const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 255
  },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("List", listSchema);
