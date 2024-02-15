'use client';
import useStoreBranchesStore from '@/store/storeBranches';
import { Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';

function Settings({ children }) {
  const storeBranchActive = useStoreBranchesStore(
    (state) => state.storeBranchActive
  );
  const router = useRouter();
  const pathname = usePathname();

  const restaurantFloorsOptions = useMemo(() => {
    return (
      (storeBranchActive &&
        storeBranchActive.restaurantFloors &&
        storeBranchActive.restaurantFloors.reverse().map((floor) => ({
          label: floor.name,
          key: `settings/floor/${floor.id}`
        }))) ??
      []
    );
  }, [storeBranchActive]);

  const menuItems = useMemo(
    () => [
      {
        label: 'General',
        key: 'settings/general'
      },
      {
        label: 'Category',
        key: 'settings/category'
      },
      {
        label: 'Menu',
        key: 'settings/menu'
      },
      {
        label: 'Floor',
        key: 'settings/floor'
      },
      {
        label: 'Table layout',
        key: 'settings/option3',
        children: [
          {
            type: 'group',
            label: storeBranchActive?.name,
            children: restaurantFloorsOptions ?? []
          }
        ]
      }
    ],
    [restaurantFloorsOptions]
  );

  const [selectedKey, setSelectedKey] = useState(() => {
    const item = menuItems.find((item) =>
      pathname.startsWith('/settings/' + item.key)
    );
    return item?.key || 'settings/general';
  });

  const onClick = (e) => {
    setSelectedKey(e.key);
    router.push(`/${e.key}`, { scroll: false });
  };
  return (
    <div className='h-full w-full flex-[1]'>
      <div className='layout-settings h-full flex flex-row'>
        <div className='h-full flex-[1]'>
          <Menu
            defaultSelectedKeys={['settings/floor']}
            selectedKeys={[selectedKey]}
            className='h-full'
            onClick={onClick}
            mode='vertical'
            items={menuItems}
          />
        </div>
        <div className='flex-[6]'>{children}</div>
      </div>
    </div>
  );
}

export default Settings;
