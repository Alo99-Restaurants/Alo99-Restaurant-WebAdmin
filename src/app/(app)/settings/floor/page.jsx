'use client';
import PrimaryTable from '@/components/shared/PrimaryTable';
import { useNotification } from '@/context/NotificationContext';
import {
  deleteRestaurantFloorByIdService,
  getRestaurantFloorsService,
  postRestaurantFloorsService
} from '@/services/restaurant.service';
import useStoreBranchesStore from '@/store/storeBranches';
import { Button, Collapse, Space } from 'antd';
import { useEffect, useState } from 'react';

import FloorForm from '@/components/FloorForm';
import { Form } from 'antd';
import Title from 'antd/es/typography/Title';

function FloorPage() {
  const { addNotification } = useNotification();
  const storeBranchActive = useStoreBranchesStore(
    (state) => state.storeBranchActive
  );
  const [form] = Form.useForm();
  const [restaurantFloors, setRestaurantFloors] = useState([]);

  const onFinish = async (values) => {
    const payload = {
      ...values,
      restaurantId: storeBranchActive.id,
      layoutUrl: null,
      extensionData: null
    };
    const response = await postRestaurantFloorsService(payload);
    if (response?.data?.data) {
      addNotification('Create floor successful', 'success');
      fetchRestaurantFloor();
    }
  };

  const handleRemoveFloor = async (id) => {
    const res = await deleteRestaurantFloorByIdService(id);
    if (res.status === 200) {
      addNotification('Delete floor successful', 'success');
      fetchRestaurantFloor();
    }
  };

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

  const items = [
    {
      key: '1',
      label: 'Add new floor',
      children: (
        <div className='py-2'>
          <div className='flex'>
            <div className='flex-1'>
              <FloorForm form={form} onFinish={onFinish} />
            </div>
            <div className='flex-1'>
              <Title className='text-center mb-8' level={4}>
                Upload Layout Image
              </Title>
            </div>
          </div>
        </div>
      )
    },
    {
      key: '2',
      label: 'Floor list',
      children: (
        <PrimaryTable
          rowKey='name'
          columns={columns}
          dataSource={restaurantFloors}
        />
      )
    }
  ];

  return (
    <div className='p-2 h-full overflow-y-auto '>
      <Collapse items={items} defaultActiveKey={['2']} />
    </div>
  );
}

export default FloorPage;

