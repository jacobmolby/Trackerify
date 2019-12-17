const mongoose = require('mongoose');

const labelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 255
  },
  color: {
    type: String,
    default: '#97dcd6'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Label', labelSchema);
