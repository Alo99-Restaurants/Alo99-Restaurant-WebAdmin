'use client';
import SettingTableLayout from '@/components/SettingTableLayout';
import { useNotification } from '@/context/NotificationContext';
import { stringifyData, unescapeStringData } from '@/helper';
import { getRestaurantFloorByIdService } from '@/services/restaurant.service';
import { getFloorTablesService } from '@/services/restaurant.table.service';
import Title from 'antd/es/typography/Title';
import React, { useCallback, useEffect, useState } from 'react';

function FloorDetail(props) {
  const {
    params: { floor_id: floorId }
  } = props;
  const { addNotification } = useNotification();

  const [floor, setFloor] = useState({});
  const [floorTables, setFloorTables] = useState([]);

  const fetchRestaurantFloor = async (id) => {
    try {
      if (!id) return;
      const response = await getRestaurantFloorByIdService(id);
      if (response?.data?.data) {
        setFloor(response.data.data);
      }
    } catch (error) {
      addNotification('Can not get restaurant floor info', 'error');
    }
  };

  const fetchRestaurantFloorTables = useCallback(async (id) => {
    try {
      if (!id) return;
      const response = await getFloorTablesService(id);
      if (response?.data?.items) {
        setFloorTables(response.data.items);
      }
    } catch (error) {
      addNotification('Can not get restaurant floor tables info', 'error');
    }
  }, []);

  useEffect(() => {
    if (floorId) {
      fetchRestaurantFloor(floorId);
      fetchRestaurantFloorTables(floorId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [floorId]);

  const mapDataTables = floorTables.map((table) => {
    const extensionData = unescapeStringData(table.extensionData);
    return {
      id: table.id,
      type: table.tableType,
      width: extensionData.width,
      height: extensionData.height,
      position: extensionData.position,
      direction: extensionData.direction,
      capacity: table.capacity,
      tableName: table.tableName
    };
  });

  return (
    <div className='px-10'>
      <Title className='pb-2' level={3}>
        Sơ đồ tầng {floor.name}
      </Title>
      <div>
        <SettingTableLayout
          floorId={floorId}
          floorTables={mapDataTables}
          onSaveLayout={fetchRestaurantFloorTables}
        />
      </div>
    </div>
  );
}

export default FloorDetail;
