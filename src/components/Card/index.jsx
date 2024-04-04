import React from 'react';

function Card({ title, value }) {
  return (
    <div className='w-full h-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100'>
      <div className='h-full flex flex-col'>
        <h4 className='mb-2 text-xl font-bold tracking-tight text-gray-900'>
          {title}
        </h4>
        <h4 className='flex justify-center items-center h-full text-center mb-2 font-bold tracking-tight text-gray-900 text-[70px]'>
          {value}
        </h4>
      </div>
    </div>
  );
}

export default Card;
