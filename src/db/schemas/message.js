const mongoose = require('mongoose');
const {v4: uuidv4} = require('uuid');
const messageSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: () => `msg-${uuidv4()}`
    },
    text: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    groupId: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('Message', messageSchema);
;
