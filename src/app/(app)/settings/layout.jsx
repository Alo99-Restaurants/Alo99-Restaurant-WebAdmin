'use client';
import { Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

const menuItems = [
  {
    label: 'Floor setting',
    key: 'settings/floor'
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
        children: [
          {
            label: 'Tầng 1',
            key: 'settings/floor/1'
          },
          {
            label: 'Tầng 2',
            key: 'settings/floor/2'
          }
        ]
      }
    ]
  }
];

function Settings({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedKey, setSelectedKey] = useState(() => {
    const item = menuItems.find((item) =>
      pathname.startsWith('/settings/' + item.key)
    );
    return item?.key || 'settings/floor';
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
