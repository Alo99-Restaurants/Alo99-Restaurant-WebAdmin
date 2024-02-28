import { convertToUSDateTime } from '@/helper';
import useStoreBranchesStore from '@/store/storeBranches';
import { Card } from 'antd';
import React from 'react'
import { useShallow } from 'zustand/react/shallow';

function BookingDetailCard({ bookingActive, colorStatus }) {
  const { bookingDetail } = bookingActive;

  const { storeBranchActive, storeBranches } = useStoreBranchesStore(
    useShallow((state) => ({
      storeBranchActive: state.storeBranchActive,
      storeBranches: state.storeBranches
    }))
  );
  const restaurantFloors = storeBranchActive.restaurantFloors;
  console.log('restaurantFloors', restaurantFloors);

  // useEffect(() => {
  //   const fetchBookingDetailById = (id) => {
  //     getBookingByIdService(id)
  //       .then((response) => {
  //         const dataBooingDetail = response?.data?.data;
  //         setBookingActive({
  //           bookingDetail: dataBooingDetail
  //         });
  //         console.log('Booking Service By Id Response', dataBooingDetail);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching Booking Detail Service', error);
  //       });
  //   };
  //   if (bookingIdSelected) {
  //     fetchBookingDetailById(bookingIdSelected);
  //   }
  // }, [bookingIdSelected]);

  return (
    <Card title='Booking Information' className='p-4 h-full'>
      <p>
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
              <span> ● </span>
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

      {/* Food info */}
      <div className='text-lg mt-10 mb-2'>
        <strong>Food information has been ordered:</strong>
      </div>
    </Card>
  );
}

export default BookingDetailCard
