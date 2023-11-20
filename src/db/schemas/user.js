const mongoose = require('mongoose');
const {v4: uuidv4}= require('uuid');

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: () => `u-${uuidv4()}`
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
});


module.exports = mongoose.model('User', userSchema);;
