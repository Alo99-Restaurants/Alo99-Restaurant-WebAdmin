'use client';
import PrimaryTable from '@/components/shared/PrimaryTable';
import { useNotification } from '@/context/NotificationContext';
import { Button, Collapse, Image, Space } from 'antd';
import { useEffect, useState } from 'react';
import { Form } from 'antd';
import {
  deleteRestaurantMenu,
  getRestaurantMenu,
  postRestaurantMenu,
  putRestaurantMenu
} from '@/services/menu.service';
import { IMAGE } from '@/constants';
import MenuForm from '@/components/MenuForm';
import PrimaryModal from '@/components/shared/PrimaryModal';
import { getMenuCategory } from '@/services/category.service';

function MenuPage() {
  const { addNotification } = useNotification();
  const [form] = Form.useForm();
  const [menuCategories, setMenuCategories] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null); // Add state to store selected menu item
  const [categories, setCategories] = useState([]);

  const fetchCategory = async () => {
    try {
      const response = await getMenuCategory();
      const categories = response?.data?.items;
      if (categories) {
        setCategories(categories);
      }
    } catch (error) {
      console.error('Fetch Category Error', error);
    }
  };

  const onFinish = async (values) => {
    const payload = values;
    const response = await postRestaurantMenu(payload);
    if (response?.data?.data) {
      addNotification('Add new menu successful', 'success');
      fetchRestaurantMenu();
    }
  };

  const handleEditRestaurantMenu = async (id, values) => {
    const payload = values;
    const response = await putRestaurantMenu(id, payload);
    if (response?.data?.data) {
      addNotification('Edit new menu successful', 'success');
      fetchRestaurantMenu();
    }
  };

  const handleRemoveRestaurantMenu = async (id) => {
    const res = await deleteRestaurantMenu(id);
    if (res.status === 200) {
      addNotification('Delete menu successful', 'success');
      fetchRestaurantMenu();
    }
  };

  const fetchRestaurantMenu = async () => {
    try {
      const response = await getRestaurantMenu();
      const menuCategories = response?.data?.items;
      if (menuCategories) {
        setMenuCategories(menuCategories);
      }
    } catch (error) {
      console.error('Fetch Menu Category Error', error);
    }
  };

  useEffect(() => {
    fetchRestaurantMenu();
    fetchCategory();
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
          src={record.menuUrl}
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
      dataIndex: 'menuCategoryId',
      key: 'menuCategoryId',
      render: (_, record) => (
        <span>
          {
            categories.find((category) => category.id === record.menuCategoryId)
              ?.name
          }
        </span>
      )
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
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Icon URL',
      dataIndex: 'menuUrl',
      key: 'menuUrl'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button
            type='primary'
            className='bg-[#4096ff]'
            onClick={() => handleEditMenu(record)}>
            Edit
          </Button>
          <Button
            type='primary'
            onClick={() => handleRemoveRestaurantMenu(record.id)}
            danger>
            Delete
          </Button>
        </Space>
      )
    }
  ];

  const handleEditMenu = (record) => {
    form.setFieldsValue(record);
    setSelectedMenu(record); // Set selected menu item
    setIsOpenModal(true);
  };

  const items = [
    {
      key: '1',
      label: 'Add new menu',
      children: (
        <div className='py-2'>
          <div className='flex'>
            <div className='flex-1'>
              <MenuForm
                form={form}
                onFinish={onFinish}
                selectedMenu={selectedMenu}
              />
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
      <PrimaryModal
        onOk={() =>
          handleEditRestaurantMenu(selectedMenu.id, form.getFieldsValue())
        }
        isOpen={isOpenModal}
        onCancel={() => {
          form.resetFields(); // Clean up form values when modal is closed
          setIsOpenModal(false);
        }}
        title={'Edit Menu'}
        width={1000}>
        <MenuForm form={form} isEdit={true} />
      </PrimaryModal>
    </div>
  );
}

export default MenuPage;
