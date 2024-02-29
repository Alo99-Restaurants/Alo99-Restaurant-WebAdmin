'use client';
import { convertToUSDateTime } from '@/helper';
import {
  BorderOutlined,
  CheckOutlined,
  CloseOutlined,
  CopyOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Card } from 'antd';

function BookingCard({
  booking,
  isActive,
  colorStatus,
  onSelected,
  onUpdateStatusBooking
}) {
  const borderColor = isActive ? '2px solid red' : '';

  const handleClickChangeStatus = (status) => {
    onUpdateStatusBooking(booking.id, status);
  };

  const renderActionBtn = () => {
    let actionButtons = [];

    if (booking.bookingStatusId === 'New') {
      actionButtons = [
        <div
          key='Confirm'
          className='text-lg font-bold text-[#2db7f5]'
          onClick={() => handleClickChangeStatus('Confirm')}>
          Confirm
        </div>,
        <div
          key='Cancelled'
          className='text-lg font-bold text-red-600'
          onClick={() => handleClickChangeStatus('Cancelled')}>
          Cancel
        </div>
      ];
    } else if (booking.bookingStatusId === 'Confirm') {
      actionButtons = [
        <div
          key='New'
          className='text-lg font-bold text-[#4bae4b]'
          onClick={() => handleClickChangeStatus('New')}>
          New
        </div>,
        <div
          key='Using'
          className='text-lg font-bold text-gray-500'
          onClick={() => handleClickChangeStatus('Using')}>
          Using
        </div>,
        <div
          key='Completed'
          className='text-lg font-bold text-purple-600'
          onClick={() => handleClickChangeStatus('Completed')}>
          Complete
        </div>,
        <div
          key='Cancelled'
          className='text-lg font-bold text-red-600'
          onClick={() => handleClickChangeStatus('Cancelled')}>
          Cancel
        </div>
      ];
    } else if (booking.bookingStatusId === 'Using') {
      actionButtons = [
        <div
          key='Confirm'
          className='text-lg font-bold text-[#2db7f5]'
          onClick={() => handleClickChangeStatus('Confirm')}>
          Confirm
        </div>,
        <div
          key='Completed'
          className='text-lg font-bold text-purple-600'
          onClick={() => handleClickChangeStatus('Completed')}>
          Complete
        </div>,
        <div
          key='Cancelled'
          className='text-lg font-bold text-red-600'
          onClick={() => handleClickChangeStatus('Cancelled')}>
          Cancel
        </div>
      ];
    } else if (booking.bookingStatusId === 'Completed') {
      actionButtons = [
        <div
          key='Using'
          className='text-lg font-bold text-gray-500'
          onClick={() => handleClickChangeStatus('Using')}>
          Using
        </div>,
        <div
          key='Cancelled'
          className='text-lg font-bold text-red-600'
          onClick={() => handleClickChangeStatus('Cancelled')}>
          Cancel
        </div>
      ];
    } else if (booking.bookingStatusId === 'Cancelled') {
      actionButtons = [
        <div
          key='New'
          className='text-lg font-bold text-[#4bae4b]'
          onClick={() => handleClickChangeStatus('New')}>
          New
        </div>,
        <div
          key='Confirm'
          className='text-lg font-bold text-[#2db7f5]'
          onClick={() => handleClickChangeStatus('Confirm')}>
          Confirm
        </div>,
        <div
          key='Using'
          className='text-lg font-bold text-gray-500'
          onClick={() => handleClickChangeStatus('Using')}>
          Using
        </div>,
        <div
          key='Completed'
          className='text-lg font-bold text-purple-600'
          onClick={() => handleClickChangeStatus('Completed')}>
          Complete
        </div>
      ];
    }

    return actionButtons;
  };

  return (
    <Card
      title={convertToUSDateTime(booking.bookingDate)}
      headStyle={{ backgroundColor: colorStatus }}
      bordered={true}
      className={`w-full shadow-md my-4`}
      style={{ border: borderColor }}
      actions={renderActionBtn()}>
      <div
        className='cursor-pointer -m-6'
        onClick={() => onSelected(booking.id)}>
        <div className='p-6'>
          <div className='flex justify-between'>
            <div className='flex gap-2 py-1'>
              <BorderOutlined className='text-lg' />
              <span className='text-lg'>
                Total tables: {booking.tables?.length}
              </span>
            </div>
            <div className='flex gap-2 py-1'>
              <UserOutlined className='text-lg' />
              <span className='text-lg'>
                Total people: {booking.numberOfPeople}
              </span>
            </div>
          </div>
          <div className='flex gap-2 py-1'>
            <CopyOutlined className='text-lg' />
            <p className='text-lg'>Notes: {booking.note} </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default BookingCard;
