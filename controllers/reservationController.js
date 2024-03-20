const Reservation = require('../models/Reservation');
const Room = require('../models/Room');

//Get all Reservations 
const getAllReservations = async (req ,res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    }catch(err) {
        res.status(500).json({message : err.message});
    }  
};

//Create a new reservation 
const createReservation = async (req, res) => {
    const {
        checkInDate,
        checkOutDate,
        guestName,
        numberOfGuests,
        bookingChannel,
        roomId
    } = req.body;

    try {
        const newReservation = await Reservation.create({
            checkInDate,
            checkOutDate,
            guestName,
            numberOfGuests,
            bookingChannel,
            roomId
        });

        const currentDate = new Date();
        const checkInDateObj = new Date(checkInDate);
        const checkOutDateObj = new Date(checkOutDate);

        if (checkInDateObj <= currentDate) {
            // Check if the check-out date is in the past
            const endOfDay = new Date(currentDate);
            endOfDay.setHours(23, 59, 59, 999); // Set to the end of the day
            if (checkOutDateObj <= endOfDay) {
                // Room has been checked out in the past, mark it as clean
                await Room.findByIdAndUpdate(roomId, { clean: true });
            } else {
                // Room is currently occupied, mark it as dirty
                await Room.findByIdAndUpdate(roomId, { clean: false });
            }
        }

        return res.status(201).json(newReservation);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

    //Update a reservation 
    const updateReservation = async(req, res) => {
        try {
            const reservation = await Reservation.findById(req.params.id);
            if(!reservation) {
                return res.status(404).json({message: 'Reservation not found'});
            }
            reservation.checkInDate = req.body.checkInDate;
            reservation.checkOutDate = req.body.checkOutDate;
            reservation.guestName = req.body.guestName;
            reservation.numberOfGuests = req.body.numberOfGuests;
            reservation.bookingChannel = req.body.bookingChannel;
            reservation.roomId = req.body.roomId;
        
            await reservation.save();
            res.json(reservation);
          } catch (err) {
            res.status(500).json({ message: err.message });
          }

        
    };
    //Get all reservations for a specific month 
    const getAllReservationsForMonth = async (req,res) => {
        try {
            //Extract year and month from request query parameters
            const {year , month } = req.query;

            //validate year and month parameters
            if(!year || !month) {
                return res.status(400).json({message: 'Year and month parameters are required'});
            }

            // Convert year and month to numbers 
            const yearNumber = parseInt(year,10);
            const monthNumber = parseInt(month , 10);

            //Calculate the start and end dates of the specified month
            const startDate = new Date(yearNumber , monthNumber - 1 , 1);
            const endDate = new Date(yearNumber , monthNumber , 0);

            //Fetch reservations for the specified month and year
            const reservations = await Reservation.find({
                checkInDate: { 
                    $gte: startDate,
                    $lte: endDate
                }
            });

            res.json(reservations);

         }catch (err) {
            res.status(500).json({message: err.message});
         }
    }

    module.exports = {
        getAllReservations,
        createReservation,
        updateReservation,
        getAllReservationsForMonth,
    };
