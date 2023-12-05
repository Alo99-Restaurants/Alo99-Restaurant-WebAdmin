'use client';
import SettingTableLayout from '@/components/SettingTableLayout';
import { Menu } from 'antd';
import React, { useState } from 'react';

const items = [
  {
    label: 'Change table layout',
    key: 'option1'
  },
  {
    label: 'Setting option 2',
    key: 'option2',
    disabled: true
  },
  {
    label: 'Setting option 3 - Submenu',
    key: 'option3',
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1'
          },
          {
            label: 'Option 2',
            key: 'setting:2'
          }
        ]
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3'
          },
          {
            label: 'Option 4',
            key: 'setting:4'
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

function Settings() {
  const [current, setCurrent] = useState('option1');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
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
        <div className='flex-[6] flex justify-center items-center'>
          <SettingTableLayout />
        </div>
      </div>
    </div>
  );
}

export default Settings;
