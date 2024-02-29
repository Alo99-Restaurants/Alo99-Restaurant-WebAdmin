import { convertPrice, convertToUSDateTime } from '@/helper';
import { getCustomerInfoService } from '@/services/customner.service';
import { getBookingMenuService } from '@/services/restaurant.booking.service';
import useStoreBranchesStore from '@/store/storeBranches';
import { Card, Divider } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

function BookingDetailCard({ bookingActive, colorStatus }) {
  const { bookingDetail } = bookingActive;
  const [menuOrdered, setMenuOrdered] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({});

  const { storeBranchActive, storeBranches } = useStoreBranchesStore(
    useShallow((state) => ({
      storeBranchActive: state.storeBranchActive,
      storeBranches: state.storeBranches
    }))
  );
  const restaurantFloors = storeBranchActive.restaurantFloors;

  useEffect(() => {
    const fetchBookingMenuById = async (id) => {
      try {
        const responseBookingMenuById = await getBookingMenuService({
          BookingId: id
        });
        const menuOrdered = responseBookingMenuById.data?.items;
        setMenuOrdered(menuOrdered);
      } catch (error) {}
    };

    if (bookingDetail?.id) {
      fetchBookingMenuById(bookingDetail.id);
    }
    const fetchDataInterval = setInterval(() => {
      if (bookingDetail?.id) {
        fetchBookingMenuById(bookingDetail?.id);
      }
    }, 10000); // 10s

    return () => clearInterval(fetchDataInterval);
  }, [bookingDetail?.id]);

    useEffect(() => {
      const fetchCustomerInfoById = async (id) => {
        try {
          const response = await getCustomerInfoService(id);
          const customerInfo = response.data?.data;
          setCustomerInfo(customerInfo);
        } catch (error) {}
      };

      if (bookingDetail?.customerId) {
        fetchCustomerInfoById(bookingDetail?.customerId);
      }
    }, [bookingDetail?.customerId]);

  return (
    <div className='h-full text-lg px-6 overflow-y-auto'>
      <p>
        <strong>Customer ID: </strong>
        {bookingDetail?.customerId}
      </p>
      <div className='pl-10'>
        <span> ➤ </span>
        <span>
          <strong>Full Name: </strong>
          {customerInfo?.name}
        </span>
      </div>
      <div className='pl-10'>
        <span> ➤ </span>
        <span>
          <strong>Phone: </strong>
          {customerInfo?.phoneNumber}
        </span>
      </div>
      <div className='pl-10'>
        <span> ➤ </span>
        <span>
          <strong>Email: </strong>
          {customerInfo?.email}
        </span>
      </div>

      <Divider />

      <p className='mt-10'>
        <strong>Booking ID: </strong>
        {bookingDetail?.id}
      </p>
      <p>
        <strong>Booking Date: </strong>
        {convertToUSDateTime(bookingDetail?.bookingDate)}
      </p>
      <div className='flex items-center gap-2'>
        <strong>Booking Status: </strong>
        <div className='w-3 h-3' style={{ backgroundColor: colorStatus }} />
        <span>{bookingDetail?.bookingStatusId}</span>
      </div>
      <p>
        <strong>Number of People: </strong>
        {bookingDetail?.numberOfPeople}
      </p>
      <p>
        <strong>Note: </strong>
        {bookingDetail?.note}
      </p>

      <Divider />

      {/* Table info */}
      <div className='text-lg mt-10 mb-2'>
        <strong>Table information has been booked:</strong>
      </div>
      <div>
        {bookingDetail?.tables?.map((table, index) => {
          const floorOfTable = restaurantFloors.find(
            (floor) => floor.id === table.restaurantFloorId
          );
          return (
            <div className='pl-10' key={table.id}>
              <span> ➤ </span>
              <span>
                <strong>Table Name: </strong>Bàn số {index + 1}
              </span>
              <span> - </span>
              <span>
                <strong>Capacity of table: </strong>
                {table.capacity}
              </span>
              <span> - </span>
              <span>
                <strong>Floor: </strong>
                {floorOfTable?.name}
              </span>
            </div>
          );
        })}
      </div>

      <Divider />

      {/* Food info */}
      <div className='text-lg mt-10 mb-2'>
        <strong>Food information has been ordered:</strong>
      </div>
      {menuOrdered.map((menu) => {
        return (
          <div className='flex items-center pl-10 py-2 gap-4' key={menu.id}>
            <span> ➤ </span>
            <div className='w-16 h-16 relative object-cover'>
              <Image
                fill={true}
                loader={() => menu.restaurantMenu.menuUrl}
                src={menu.restaurantMenu.menuUrl}
                alt='restaurant image'
              />
            </div>
            <span> x {menu.quantity}</span>
            <span>
              <strong>{menu.restaurantMenu.name}</strong>
            </span>
            <span>
              = {convertPrice(Number(menu.quantity) * Number(menu.price))}
            </span>
          </div>
        );
      })}
      <div className='py-2'>
        <strong>
          {`Total Price: 
          ${convertPrice(
            menuOrdered.reduce(
              (accumulator, currentValue) =>
                accumulator +
                Number(currentValue.quantity) * Number(currentValue.price),
              0
            )
          )}`}
        </strong>
      </div>
    </div>
  );
}

export default BookingDetailCard;
