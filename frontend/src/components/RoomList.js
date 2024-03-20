import React, { useEffect , useState } from 'react';
import axios from 'axios';


const RoomList = () => {
    const [rooms , setRooms] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/rooms')
        .then(response => {
            setRooms(response.data);
        })
        .catch(error => {
            console.error('Error fetching rooms:' , error);
        });
    } , []);

    return (
        <div className='container mt-4'>
            <h2 className='heading'>Rooms</h2>
            <ul className='list-group'>
                {rooms.map(room => (
                    <li key={room._id} className="list-group-item">{room.roomNumber} - {room.roomType} - {room.clean ? 'Clean' : 'Dirty'}</li>
                ))}
            </ul>
        </div>
    )
            }
export default RoomList;