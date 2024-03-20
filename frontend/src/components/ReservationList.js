import React from 'react';

const ReservationList = ({ reservations }) => {
    // Function to format date to display only date part
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options); // Change the format as needed
    };

    return (
        <div className='container mt-4'>
            <h2 className='heading'>Reservations</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Name</th>
                        <th>Guest Number</th>
                        <th>Channel</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map(reservation => (
                        <tr key={reservation._id}>
                            <td>{formatDate(reservation.checkInDate)}</td>
                            <td>{formatDate(reservation.checkOutDate)}</td>
                            <td>{reservation.guestName}</td>
                            <td>{reservation.numberOfGuests}</td>
                            <td>{reservation.bookingChannel}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationList;