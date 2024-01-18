'use client';
import SettingTableLayout from '@/components/SettingTableLayout';
import { useNotification } from '@/context/NotificationContext';
import { stringifyData, unescapeStringData } from '@/helper';
import { getRestaurantFloorByIdService } from '@/services/restaurant.service';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useState } from 'react';

function FloorDetail(props) {
  const {
    params: { floor_id: floorId }
  } = props;

  const [floor, setFloor] = useState({});
  const { addNotification } = useNotification();

  const fetchRestaurantFloor = async (id) => {
    try {
      if (!id) return;
      const response = await getRestaurantFloorByIdService(id);
      if (response?.data?.data) {
        setFloor(response.data.data);
      }
    } catch (error) {
      addNotification('Can not get restaurant info', 'error');
    }
  };

  useEffect(() => {
    if (floorId) {
      fetchRestaurantFloor(floorId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [floorId]);

  console.log('floor', floor);

  return (
    <div className='px-10'>
      <Title className='pb-2' level={3}>
        Sơ đồ tầng {floor.name}
      </Title>
      <div>
        <SettingTableLayout floorId={floorId} />
      </div>
    </div>
  );
}

export default FloorDetail;
