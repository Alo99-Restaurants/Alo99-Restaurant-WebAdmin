'use client';
import FloorForm from '@/components/FloorForm';
import RestaurantInfoForm from '@/components/RestaurantInfoForm';
import UploadImages from '@/components/UploadImages';
import { useNotification } from '@/context/NotificationContext';
import { useLocalStorage } from '@/hook/useLocalStorage';
import {
  getRestaurantByIdService,
  postRestaurantFloorsService,
  updateRestaurantService
} from '@/services/restaurant.service';
import useStoreBranchesStore from '@/store/storeBranches';
import { Button, DatePicker, Form, Input, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

function CreateFloor() {
  const { addNotification } = useNotification();
  const storeBranchActive = useStoreBranchesStore(
    (state) => state.storeBranchActive
  );

  const [form] = Form.useForm();
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
    }
  };

  return (
    <div className='h-full overflow-y-auto px-10 py-2'>
      <div className='flex'>
        <div className='flex-1'>
          <Title className='text-center mb-8' level={4}>
            Add New Floor
          </Title>
          <FloorForm form={form} onFinish={onFinish} />
          {/* <RestaurantInfoForm form={form} onFinish={onFinish} /> */}
        </div>
        <div className='flex-1'>
          <Title className='text-center mb-8' level={4}>
            Upload Layout Image
          </Title>
          {/* <UploadImages idStoreBranch={storeBranchActive.id} /> */}
        </div>
      </div>
    </div>
  );
}

export default CreateFloor;
