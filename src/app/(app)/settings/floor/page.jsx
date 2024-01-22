'use client';
import PrimaryTable from '@/components/shared/PrimaryTable';
import { useNotification } from '@/context/NotificationContext';
import {
  deleteRestaurantFloorByIdService,
  getRestaurantFloorsService
} from '@/services/restaurant.service';
import useStoreBranchesStore from '@/store/storeBranches';
import { Button, Space } from 'antd';
import React, { useEffect, useState } from 'react';

function FloorPage() {
  const { addNotification } = useNotification();

  const handleRemoveFloor = async (id) => {
    const res = await deleteRestaurantFloorByIdService(id);
    if (res.status === 200) {
      addNotification('Delete floor successful', 'success');
    }
  };

  const columns = [
    {
      title: 'Floor Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Floor Number',
      dataIndex: 'floorNumber',
      key: 'floorNumber'
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity'
    },
    {
      title: 'Layout Image Url',
      dataIndex: 'layoutUrl'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button type='primary' className='bg-[#4096ff]'>
            Edit
          </Button>
          <Button
            type='primary'
            onClick={() => handleRemoveFloor(record.id)}
            danger>
            Delete
          </Button>
        </Space>
      )
    }
  ];
  const storeBranchActive = useStoreBranchesStore(
    (state) => state.storeBranchActive
  );
  const [restaurantFloors, setRestaurantFloors] = useState([]);

  const fetchRestaurantFloor = async () => {
    const response = await getRestaurantFloorsService(storeBranchActive.id);
    const restaurantFloors = response?.data?.items;
    if (restaurantFloors) {
      setRestaurantFloors(restaurantFloors);
    }
  };

  useEffect(() => {
    if (storeBranchActive.id) {
      fetchRestaurantFloor();
    }
  }, [storeBranchActive]);

  return (
    <div className='p-2'>
      <PrimaryTable
        rowKey='name'
        columns={columns}
        dataSource={restaurantFloors}
      />
    </div>
  );
}

export default FloorPage;
