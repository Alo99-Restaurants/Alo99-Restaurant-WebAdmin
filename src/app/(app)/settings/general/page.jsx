'use client';
import RestaurantInfoForm from '@/components/RestaurantInfoForm';
import UploadImages from '@/components/UploadImages';
import { useNotification } from '@/context/NotificationContext';
import { useLocalStorage } from '@/hook/useLocalStorage';
import {
  getRestaurantByIdService,
  updateRestaurantService
} from '@/services/restaurant.service';
import useStoreBranchesStore from '@/store/storeBranches';
import { Button, DatePicker, Form, Input, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

function GeneralPage() {
  const { addNotification } = useNotification();
  const { storeBranchActive, setStoreBranchActive } = useStoreBranchesStore(
    useShallow((state) => ({
      storeBranchActive: state.storeBranchActive,
      setStoreBranchActive: state.setStoreBranchActive
    }))
  );
  const [form] = Form.useForm();

  useEffect(() => {
    if (storeBranchActive) {
      form.setFieldsValue(storeBranchActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeBranchActive]);

  const onFinish = async (values) => {
    const response = await updateRestaurantService(
      storeBranchActive.id,
      values
    );
    if (response?.data?.data) {
      addNotification('Update restaurant info successful', 'success');
      setStoreBranchActive({ ...storeBranchActive, ...values });
    }
  };

  return (
    <div className='h-full overflow-y-auto px-10 py-2'>
      <div className='flex'>
        <div className='flex-1'>
          <Title className='text-center mb-8' level={4}>
            Restaurant Info
          </Title>
          <RestaurantInfoForm form={form} onFinish={onFinish} />
        </div>
        <div className='flex-1'>
          <Title className='text-center mb-8' level={4}>
            Restaurant Images
          </Title>
          <UploadImages idStoreBranch={storeBranchActive?.id} />
        </div>
      </div>
    </div>
  );
}

export default GeneralPage;
