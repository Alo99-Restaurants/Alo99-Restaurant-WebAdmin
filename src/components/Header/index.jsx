'use client';

import {
  FileOutlined,
  HomeOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Avatar, Layout, Menu, Select } from 'antd';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Alo99Logo from '../../assets/alo99-logo.png';
import useStoreBranchesStore from '@/store/storeBranches';
import { useLocalStorage } from '@/hook/useLocalStorage';
import { useShallow } from 'zustand/react/shallow';

const { Header: HeaderLib } = Layout;
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

function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { storeBranches, storeBranchActive, setStoreBranchActive } =
    useStoreBranchesStore(
      useShallow((state) => ({
        storeBranches: state.storeBranches,
        storeBranchActive: state.storeBranchActive,
        setStoreBranchActive: state.setStoreBranchActive
      }))
    );

  const [storeBranchActiveLocalStorage, setStoreBranchActiveLocalStorage] =
    useLocalStorage('storeBranchActive');

  const storeBranchesOptions = storeBranches.map((store) => {
    return { value: store.id, label: store.name };
  });

  const [selectedKey, setSelectedKey] = useState(() => {
    const item = menuItems.find((item) => pathname.startsWith('/' + item.key));
    return item?.key || 'dashboard';
  });

  const handleMenuItemClick = ({ key }) => {
    setSelectedKey(key);
    router.push('/' + key, { scroll: false });
  };

  const handleChangeStoreBranch = (value) => {
    const storeBranchActive = storeBranches.find(
      (branch) => branch.id === value
    );
    setStoreBranchActiveLocalStorage(storeBranchActive);
    setStoreBranchActive(storeBranchActive);
  };

  const defaultValueBranchActive = storeBranchActive.id;

  return (
    <HeaderLib className='flex items-center bg-white shadow'>
      <div className='w-[100px] flex justify-center items-center'>
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
        {storeBranchesOptions.length > 0 && (
          <Select
            defaultValue={defaultValueBranchActive}
            onChange={handleChangeStoreBranch}
            style={{ width: 200 }}
            options={storeBranchesOptions ?? []}
          />
        )}
      </div>

      <div className='pl-4'>
        <Avatar size={40} icon={<UserOutlined />} />
      </div>
    </HeaderLib>
  );
}

export default Header;
