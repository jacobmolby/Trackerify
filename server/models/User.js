const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
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
    profileImage: {
      type: String,
      default: 'https://img.icons8.com/officel/48/000000/user.png'
    },
    hasReadWelcomeMessage: {
      type: Boolean,
      default: false
    },
    teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }]
  },
  { timestamps: true }
);
userSchema.index({ name: 'text', email: 'text' });
module.exports = model('User', userSchema);
