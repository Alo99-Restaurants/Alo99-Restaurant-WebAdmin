import PrimaryTable from '@/components/shared/PrimaryTable';
import React from 'react';

function FloorPage() {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: 'Floor Name',
      dataIndex: 'floorName'
    },
    {
      title: 'Description',
      dataIndex: 'description'
    },
    {
      title: 'Action',
      dataIndex: 'action'
    }
  ];
  return (
    <div className='p-2'>
      <PrimaryTable columns={columns} dataSource={[]} />
    </div>
  );
}

export default FloorPage;
