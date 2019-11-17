const mongoose = require("mongoose");

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
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
