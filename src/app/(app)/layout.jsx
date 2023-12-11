'use client';

import {
  FileOutlined,
  HomeOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Avatar, Layout, Menu, Select, theme } from 'antd';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Alo99Logo from '../../assets/alo99-logo.png';

const { Header, Content, Footer } = Layout;
const AdminLayout = ({ children }) => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const menuItems = [
    {
      key: 'dashboard',
      label: (
        <div>
          <HomeOutlined />
          <span>Dashboard</span>
        </div>
      )
    },
    {
      key: 'order-management',
      label: (
        <div>
          <FileOutlined />
          <span>Order Management</span>
        </div>
      )
    },
    {
      key: 'settings',
      label: (
        <div>
          <SettingOutlined />
          <span>Settings</span>
        </div>
      )
    }
  ];

  const pathname = usePathname();
  const router = useRouter();

  const [selectedKey, setSelectedKey] = useState(() => {
    const item = menuItems.find((item) => pathname.startsWith('/' + item.key));
    return item?.key || 'dashboard';
  });

  const handleMenuItemClick = ({ key }) => {
    setSelectedKey(key);
    router.push('/' + key, { scroll: false });
  };

  return (
    <Layout className='layout bg-blue-50 backdrop-blur-md'>
      <Header className='flex items-center bg-white shadow'>
        <div className='w-[100px]'>
          <Image src={Alo99Logo} alt='Alo99 Logo' width={60} priority />
        </div>
        <Menu
          className='min-w-[calc(100vw-450px)]'
          theme='light'
          mode='horizontal'
          defaultSelectedKeys={['dashboard']}
          selectedKeys={[selectedKey]}
          onClick={handleMenuItemClick}
          items={menuItems}
        />
        <div className='w-[200px]'>
          <Select
            defaultValue={1}
            style={{ width: 200 }}
            options={[
              { value: 1, label: 'Alo99 Chi nhánh 1' },
              { value: 3, label: 'Alo99 Chi nhánh 2' },
              { value: 4, label: 'Alo99 Chi nhánh 3', disabled: true }
            ]}
          />
        </div>
        <div className='pl-4'>
          <Avatar size={40} icon={<UserOutlined />} />
        </div>
      </Header>

      <Content className='px-[20px] my-2'>
        <div
          className='site-layout-content rounded-xl mt-3 h-[calc(100vh-(69px+64px+12px+16px))] p-5  shadow'
          style={{ background: colorBgContainer }}>
          {children}
        </div>
      </Content>

      <Footer className='text-center bg-blue-50'>
        Alo99 ©2023 Created by KP
      </Footer>
    </Layout>
  );
};
export default AdminLayout;
