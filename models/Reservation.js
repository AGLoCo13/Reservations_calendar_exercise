const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    checkInDate: {
        type: Date ,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    guestName: {
        type: String,
        required: true
    },
    numberOfGuests: {
        type: Number,
        required : true
    },
    bookingChannel: {
        type: String , 
        required : true
    },
    roomId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required:true
    }
});

const Reservation = mongoose.model('Reservation' , reservationSchema);

module.exports = Reservation;