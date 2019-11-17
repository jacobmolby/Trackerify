const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    max: 255
  },
  tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Team", teamSchema);
