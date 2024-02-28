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

function BookingCard({ booking, isActive, colorStatus, onSelected }) {
  const borderColor = isActive ? '2px solid red' : '';
  return (
    <Card
      title={convertToUSDateTime(booking.bookingDate)}
      headStyle={{ backgroundColor: colorStatus }}
      bordered={true}
      className={`w-full shadow-md my-4`}
      style={{ border: borderColor }}
      actions={[
        <CheckOutlined key='confirm' className='text-lg font-black' />,
        <CloseOutlined key='close' className='text-lg font-black' />
      ]}>
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
