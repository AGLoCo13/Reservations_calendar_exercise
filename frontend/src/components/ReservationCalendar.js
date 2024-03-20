import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Rooms from './RoomList'; // Update the path as per your project structure
import Reservations from './ReservationList'; // Update the path as per your project structure
import axios from 'axios';

const ReservationCalendar = () => {
    const currentDate = new Date();
    const [date, setDate] = useState(new Date());
    const [reservations, setReservations] = useState([]);
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);

    const onChange = date => {
        setDate(date);
        setSelectedMonth(date.getMonth() + 1);
        setSelectedYear(date.getFullYear());
    };

    const handleViewAllReservations = () => {
        axios.get(`http://localhost:5000/reservations`)
            .then(response => {
                setReservations(response.data);
            })
            .catch(error => {
                console.error('Error fetching reservations:', error);
            });
    };

    const handleViewSpecificReservations = () => {
        axios.get(`http://localhost:5000/reservations/sort?year=${selectedYear}&month=${selectedMonth}`)
            .then(response => {
                setReservations(response.data);
            })
            .catch(error => {
                console.error('Error fetching reservations:', error);
            });
    };

    const handleGoToToday = () => {
        setDate(currentDate);
        setSelectedMonth(currentDate.getMonth() + 1) ;
        setSelectedYear(currentDate.getFullYear());
        handleViewAllReservations();
    }

    useEffect(() => {
        // Fetch reservations initially
        handleViewAllReservations();
    }, []);

    return (
        <div className='container mt-4'>
            <h2 className='mb-4'>Reservation Calendar</h2>
            <div className='row'>
                <div className='col-md-6'>
                    <Rooms />
                </div>
                <div className='col-md-6'>
                    <Reservations reservations={reservations} />
                </div>
            </div>
            <div className='mt-4'>
                <Calendar
                    onChange={onChange}
                    value={date}
                />
                <div className="mt-2">
                    <button className='btn btn-primary me-2' onClick={handleGoToToday}>Go to Today</button>
                    <button className='btn btn-primary' onClick={handleViewSpecificReservations}>View Selected Month's Reservations</button>
                </div>
            </div>
        </div>
    );
};

export default ReservationCalendar;