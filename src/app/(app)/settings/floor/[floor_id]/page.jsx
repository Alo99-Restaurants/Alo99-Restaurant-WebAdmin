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
      if(response?.data?.data) {
        setFloor(response.data.data);
      }
    } catch (error) {
      addNotification('Can not get restaurant info', 'error');
    }    
  };

  useEffect(() => {
    console.log('floorId', floorId);
    const testData = stringifyData([
      {
        id: '4374182c-aaf7-4476-bec7-7a0d40d80422',
        width: 100,
        height: 100,
        type: 'box2',
        position: {
          x: 100,
          y: 200
        }
      },
      {
        id: '482565bf-435f-450a-bcc6-0c4421034598',
        width: 100,
        height: 100,
        type: 'box4',
        position: {
          x: 200,
          y: 300
        }
      },
      {
        id: '820ce129-fb0b-4551-91b8-713d754426a6',
        width: 100,
        height: 100,
        type: 'box3',
        position: {
          x: 300,
          y: 100
        }
      }
    ]);

    console.log('testData', testData);
        console.log('testData parse', unescapeStringData(testData));

    if (floorId) {
      fetchRestaurantFloor(floorId);
    }
  }, [floorId]);

  console.log('floor', floor);
    


  return (
    <div className='px-10'>
      <Title className='pb-2' level={3}>
        Sơ đồ tầng {floor.name}
      </Title>
      <div>
        <SettingTableLayout />
      </div>
    </div>
  );
}

export default FloorDetail;
