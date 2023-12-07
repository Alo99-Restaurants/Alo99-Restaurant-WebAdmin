'use client';
import { Menu } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const items = [
  {
    label: 'Floor setting',
    key: 'floor'
  },
  {
    label: 'Setting option 2',
    key: 'option2',
    disabled: true
  },
  {
    label: 'Change table layout',
    key: 'option3',
    children: [
      {
        type: 'group',
        label: 'Alo99 Chi nhánh 1',
        children: [
          {
            label: 'Tầng 1',
            key: 'floor/1'
          },
          {
            label: 'Tầng 2',
            key: 'floor/2'
          }
        ]
      }
    ]
  },
  {
    label: 'Setting option 4',
    key: 'option4'
  },
  {
    label: 'Setting option 5',
    key: 'option5'
  },
  {
    label: 'Setting option 6',
    key: 'option6'
  },
  {
    label: 'Setting option 7',
    key: 'option7'
  }
];

function Settings({ children }) {
  const [current, setCurrent] = useState('option1');
  const router = useRouter();

  const onClick = (e) => {
    setCurrent(e.key);
    router.push(`/settings/${e.key}`, { scroll: false });
  };
  return (
    <div className='h-full w-full flex-[1]'>
      <div className='layout-settings h-full flex flex-row'>
        <div className='h-full flex-[1]'>
          <Menu
            className='h-full'
            onClick={onClick}
            selectedKeys={[current]}
            mode='vertical'
            items={items}
          />
        </div>
        <div className='flex-[6]'>{children}</div>
      </div>
    </div>
  );
}

export default Settings;
