/* eslint-disable no-magic-numbers */
'use client';

import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import {
  HomeOutlined,
  UserOutlined,
  FileOutlined,
  WalletOutlined,
  SettingOutlined
} from '@ant-design/icons';
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
      key: 'manage-users',
      label: (
        <div>
          <UserOutlined />
          <span>Manage Users</span>
        </div>
      )
    },
    {
      key: 'content-management',
      label: (
        <div>
          <FileOutlined />
          <span>Content Management</span>
        </div>
      )
    },
    {
      key: 'payment',
      label: (
        <div>
          <WalletOutlined />
          <span>Payment</span>
        </div>
      )
    },
    {
      key: 'settings',
      label: (
        <div>
          <SettingOutlined />
          <span>Setting</span>
        </div>
      )
    }
  ];

  const pathname = usePathname();
  const router = useRouter();

  const [selectedKey, setSelectedKey] = useState(() => {
    const item = menuItems.find((item) => pathname.endsWith(item.key));
    return item?.key || 'dashboard';
  });

  const handleMenuItemClick = ({ key }) => {
    setSelectedKey(key);
    router.push(key, { scroll: false });
  };

  return (
    <Layout className='layout'>
      <Header className='flex items-center bg-white'>
        <div className='w-[100px]'>
          <Image src={Alo99Logo} alt='Alo99 Logo' width={60} priority />
        </div>
        <Menu
          className='min-w-[calc(100vw-200px)]'
          theme='light'
          mode='horizontal'
          defaultSelectedKeys={['dashboard']}
          selectedKeys={[selectedKey]}
          onClick={handleMenuItemClick}
          items={menuItems}
        />
      </Header>

      <Content className='px-[20px]'>
        <div
          className='site-layout-content rounded-xl mt-[20px] h-[calc(100vh-(69px+64px+20px))] p-5'
          style={{ background: colorBgContainer }}>
          {children}
        </div>
      </Content>

      <Footer className='text-center'>Alo99 ©2023 Created by KP</Footer>
    </Layout>
  );
};
export default AdminLayout;
