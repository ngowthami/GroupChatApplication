const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      trquired: true
    },
    username: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
    expires: 300,
  }
);

module.exports = mongoose.model('sessions', sessionSchema);
