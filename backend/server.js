const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Room = require('../models/Room');
const roomController = require('../controllers/roomController');
const reservationController = require('../controllers/reservationController');
const app = express();
const PORT = process.env.PORT || 5000;

//Use of JSON middleware to handle requests with JSON content
app.use(express.json());
//use the cors middleware
app.use(cors({
    origin:'http://localhost:3000'
}))

// Routes for rooms
app.get('/rooms', roomController.getAllRooms);
app.post('/rooms', roomController.createRoom);
app.put('/rooms/:id', roomController.updateRoomStatus);

//Routes for Reservations
// Routes for reservations
app.get('/reservations', reservationController.getAllReservations);
app.get('/reservations/sort' , reservationController.getAllReservationsForMonth);
app.post('/reservations', reservationController.createReservation);
app.put('/reservations/:id', reservationController.updateReservation);


//Connnection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/hotel_reservation')
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});
// start server.js
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
