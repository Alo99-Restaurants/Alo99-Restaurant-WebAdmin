'use client';
import React, { useEffect } from 'react'

function CheckBooking(props) {
  const {
    params: { booking_id: bookingId }
  } = props;

    useEffect(() => {
      if (typeof window !== 'undefined') {
        console.log('open check booking id: ', bookingId);
        window.location.href = `Alo99Restaurant://check-booking/${bookingId}`;
      }
    }, []);
  return (
    <>
      <div>Check Booking {bookingId}....</div>
      <a
        className='text-blue-600'
        href={`Alo99Restaurant://check-booking/${bookingId}`}>
        Open Alo99 Application
      </a>
    </>
  );
}

export default CheckBooking