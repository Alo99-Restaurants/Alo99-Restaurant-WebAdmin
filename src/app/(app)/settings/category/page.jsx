'use client';
import PrimaryTable from '@/components/shared/PrimaryTable';
import { useNotification } from '@/context/NotificationContext';
import useStoreBranchesStore from '@/store/storeBranches';
import { Button, Collapse, Image, Space } from 'antd';
import { useEffect, useState } from 'react';

import { Form } from 'antd';
import Title from 'antd/es/typography/Title';
import CategoryForm from '@/components/CategoryForm';
import { deleteMenuCategory, getMenuCategory, postMenuCategory } from '@/services/category.service';
import { IMAGE } from '@/constants';

function CategoryPage() {
  const { addNotification } = useNotification();
  const storeBranchActive = useStoreBranchesStore(
    (state) => state.storeBranchActive
  );
  const [form] = Form.useForm();
  const [menuCategories, setMenuCategories] = useState([]);

  const onFinish = async (values) => {
    const payload = values;
    const response = await postMenuCategory(payload);
    if (response?.data?.data) {
      addNotification('Add new category successful', 'success');
      fetchMenuCategory();
    }
  };

  const handleRemoveMenuCategory = async (id) => {
    const res = await deleteMenuCategory(id);
    if (res.status === 200) {
      addNotification('Delete category successful', 'success');
      fetchMenuCategory();
    }
  };
  const fetchMenuCategory = async () => {
    try {
      const response = await getMenuCategory();
      const menuCategories = response?.data?.items;
      if (menuCategories) {
        setMenuCategories(menuCategories);
      }
    } catch (error) {
      console.error('Fetch Menu Category Error', error);
    }
  };

  useEffect(() => {
    fetchMenuCategory();
  }, []);

  const columns = [
    {
      title: '',
      dataIndex: 'iconUrl',
      key: 'icon',
      render: (_, record) => (
        <Image
          alt='icon category'
          width={60}
          height={60}
          src={record.iconUrl}
          fallback={IMAGE.fallback}
        />
      )
    },
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Icon URL',
      dataIndex: 'iconUrl',
      key: 'iconUrl'
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
            onClick={() => handleRemoveMenuCategory(record.id)}
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
      label: 'Add new category',
      children: (
        <div className='py-2'>
          <div className='flex'>
            <div className='flex-1'>
              <CategoryForm form={form} onFinish={onFinish} />
            </div>
          </div>
        </div>
      )
    },
    {
      key: '2',
      label: 'Categories',
      children: (
        <PrimaryTable
          rowKey='id'
          columns={columns}
          dataSource={menuCategories}
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

export default CategoryPage;

