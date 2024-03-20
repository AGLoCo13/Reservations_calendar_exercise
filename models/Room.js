const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: Number,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    clean: {
        type: Boolean,
        default: true
    }
});

const Room = mongoose.model('Room' , roomSchema);
module.exports = Room;