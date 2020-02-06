const { Schema, model } = require('mongoose');

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }]
  },
  { timestamps: true }
);
module.exports = model('Team', teamSchema);
