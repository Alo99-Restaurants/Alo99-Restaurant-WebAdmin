'use client';
import Card from '@/components/Card';
import ColumnChart from '@/components/Chart';
import { getBookingStatistics } from '@/services/restaurant.booking.service';
import { getUsers } from '@/services/user.service';
import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState([]);
  console.log('totalUsers', totalUsers);
  const [bookingStatistics, setBookingStatistics] = useState({});


  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      setTotalUsers(response?.data);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getBookingStatistics();
      console.log('bookingStatistics', response?.data.data)
      setBookingStatistics(response?.data.data);
    };
    fetchUsers();
  }, []);

  return (
    <div className='grid grid-cols-4 grid-rows-4 gap-4 w-full h-full'>
      <div className='col-span-1 row-span-1'>
        <Card title={'Total Users'} value={totalUsers.totalRecords} />
      </div>
      <div className='col-span-1 row-span-1'>
        <Card
          title={'Total Last 7 Days'}
          value={bookingStatistics.totalBookingLast7Days}
        />
      </div>

      <div className='col-span-2 row-span-4'>
        <ColumnChart data={totalUsers.items ?? []}/>
      </div>

      <div className='col-span-1 row-span-1'>
        <Card
          title={'Total Booking Last 30 Days'}
          value={bookingStatistics.totalBooking}
        />
      </div>
      <div className='col-span-1 row-span-1'>
        <Card
          title={'Total Booking Morning Last 30 Days'}
          value={bookingStatistics.totalBookingMorning}
        />
      </div>

      <div className='col-span-1 row-span-1'>
        <Card
          title={'Total Booking Afternoon Last 30 Days'}
          value={bookingStatistics.totalBookingAfternoon}
        />
      </div>
      <div className='col-span-1 row-span-1'>
        <Card
          title={'Total Booking Night Last 30 Days'}
          value={bookingStatistics.totalBookingNight}
        />
      </div>
      {/* <div className='col-span-2 row-span-2 bg-yellow-300'>5</div> */}
    </div>
  );
}

export default Dashboard;
