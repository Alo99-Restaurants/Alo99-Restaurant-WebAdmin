import Card from '@/components/Card';
import React from 'react';

function Dashboard() {
  return (
    <div className='grid grid-cols-4 grid-rows-4 gap-4 w-full h-full'>
      <div className='col-span-1 row-span-1'>
        <Card />
      </div>
      <div className='col-span-1 row-span-1'>
        <Card />
      </div>
      <div className='col-span-2 row-span-4 bg-blue-300'>3</div>
      <div className='col-span-2 row-span-1 bg-gray-300'>4</div>
      <div className='col-span-2 row-span-2 bg-yellow-300'>5</div>
    </div>
  );
}

export default Dashboard;
