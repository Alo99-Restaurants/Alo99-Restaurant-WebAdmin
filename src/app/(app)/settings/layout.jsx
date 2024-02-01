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
        label: 'Floor setting',
        key: '',
        children: [
          {
            type: 'group',
            label: storeBranchActive.name,
            children: [
              {
                label: 'List',
                key: 'settings/floor'
              },
              {
                label: 'Add new',
                key: 'settings/floor/create'
              }
            ]
          }
        ]
      },
      {
        label: 'Setting option 2',
        key: 'settings/option2',
        disabled: true
      },
      {
        label: 'Change table layout',
        key: 'settings/option3',
        children: [
          {
            type: 'group',
            label: 'Alo99 Chi nhánh 1',
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
