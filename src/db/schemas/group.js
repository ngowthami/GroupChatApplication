const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const groupSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    default: () => `grp-${uuidv4()}`
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  members: [
    {
      type: Array,
      require: true
    }],
});

module.exports = mongoose.model('Group', groupSchema);;
