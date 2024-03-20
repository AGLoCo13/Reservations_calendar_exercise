const Room = require('../models/Room');

//Get all Rooms 
const getAllRooms = async (req, res) => 
{
    try {
        const rooms = await Room.find();
        res.json(rooms);
    }catch (err) {
        res.status(500).json({message: err.message});
    }
};

//Create a new room
const createRoom = async (req,res) => {
    const room = new Room ({
        roomNumber: req.body.roomNumber,
        roomType: req.body.roomType,
        clean: req.body.clean
    });

    try {
        const newRoom = await room.save();
        res.status(201).json(newRoom);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

//Update room status 
const updateRoomStatus = async(req,res) => {
    try {
        const room = await Room.findById(req.params.id);
        if(!room) {
            return res.status(404).json({message: 'Room not found'});
        }
    

    room.clean = req.body.clean;
    await room.save();
    res.json(room);
    }catch (err) {
        res.status(500).json({message: err.message});
    } 
};

module.exports = {
    getAllRooms,
    createRoom,
    updateRoomStatus
};