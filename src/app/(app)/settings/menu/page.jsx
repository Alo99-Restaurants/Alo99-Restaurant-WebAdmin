'use client';
import PrimaryTable from '@/components/shared/PrimaryTable';
import { useNotification } from '@/context/NotificationContext';
import useStoreBranchesStore from '@/store/storeBranches';
import { Button, Collapse, Image, Space } from 'antd';
import { useEffect, useState } from 'react';

import { Form } from 'antd';
import Title from 'antd/es/typography/Title';
// import MenuForm from '@/components/MenuForm';
import {
  deleteMenuCategory,
  getMenuCategory,
  postMenuCategory
} from '@/services/category.service';
import { IMAGE } from '@/constants';
import MenuForm from '@/components/MenuForm';

function MenuPage() {
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
      addNotification('Add new menu successful', 'success');
      fetchMenuCategory();
    }
  };

  const handleRemoveMenuCategory = async (id) => {
    const res = await deleteMenuCategory(id);
    if (res.status === 200) {
      addNotification('Delete menu successful', 'success');
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
          alt='icon menu'
          width={60}
          height={60}
          src={record.iconUrl}
          fallback={IMAGE.fallback}
        />
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Unit Type',
      dataIndex: 'unitType',
      key: 'unitType'
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
      label: 'Add new menu',
      children: (
        <div className='py-2'>
          <div className='flex'>
            <div className='flex-1'>
              <MenuForm form={form} onFinish={onFinish} />
            </div>
          </div>
        </div>
      )
    },
    {
      key: '2',
      label: 'Menu',
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

export default MenuPage;
