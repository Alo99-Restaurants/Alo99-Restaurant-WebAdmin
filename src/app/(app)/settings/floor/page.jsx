'use client';
import PrimaryTable from '@/components/shared/PrimaryTable';
import { getRestaurantFloorsService } from '@/services/restaurant.service';
import useStoreBranchesStore from '@/store/storeBranches';
import React, { useEffect, useState } from 'react';

const columns = [
  {
    title: 'Floor Name',
    dataIndex: 'name',
    key: 'name'
  },
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
    dataIndex: 'action'
  }
];

function FloorPage() {
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
  }, [storeBranchActive.id]);

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
