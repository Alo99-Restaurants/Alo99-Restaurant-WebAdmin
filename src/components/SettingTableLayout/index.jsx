'use client';
import TableItem from '@/components/SettingTableLayout/TableItem';
import { Select } from 'antd';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function SettingTableLayout() {
  const [typeBox, setTypeBox] = useState('box2');

  const saveToLocalStorage = (key, value) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  const loadFromLocalStorage = (key) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  };

  const [listBox, setListBox] = useState(
    () =>
      loadFromLocalStorage('listBox') || [
        {
          id: '4374182c-aaf7-4476-bec7-7a0d40d80422',
          width: 100,
          height: 100,
          type: 'box2',
          position: { x: 100, y: 200 }
        },
        {
          id: '482565bf-435f-450a-bcc6-0c4421034598',
          width: 100,
          height: 100,
          type: 'box4',
          position: { x: 200, y: 300 }
        },
        {
          id: '820ce129-fb0b-4551-91b8-713d754426a6',
          width: 100,
          height: 100,
          type: 'box3',
          position: { x: 300, y: 100 }
        }
      ]
  );

  const getPosition = (id, newPosition) => {
    setListBox((prevList) => {
      return prevList.map((item) => {
        if (item.id === id) {
          return { ...item, position: newPosition };
        }
        return item;
      });
    });
  };

  const removeItem = (id) => {
    setListBox((prevList) => {
      const newList = prevList.filter((_) => _.id !== id);
      return newList;
    });
  };

  const handleChangeSelect = (value) => {
    setTypeBox(value);
  };

  const [isDelete, setIsDeleted] = useState(false);

  const buttonClass =
    'text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2';
  const buttonDeleteClass =
    'text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2';

  return (
    <main className='flex flex-row justify-between'>
      <div className='flex-[0.1]'>
        <div className='flex flex-col h-full'>
          <div className='add-table flex flex-col'>
            <Select
              defaultValue='lucy'
              className='me-2 mb-2'
              value={typeBox}
              onChange={handleChangeSelect}
              options={[
                { value: 'box2', label: 'Bàn 2' },
                { value: 'box3', label: 'Bàn 3' },
                { value: 'box4', label: 'Bàn 4' }
              ]}
            />
            <button
              className={buttonClass}
              onClick={() =>
                setListBox([
                  ...listBox,
                  {
                    id: uuidv4(),
                    width: 100,
                    height: 100,
                    type: typeBox,
                    position: { x: 0, y: 0 }
                  }
                ])
              }>
              Add table
            </button>
          </div>
          <div className='save-delete-table flex flex-col'>
            <button
              className={buttonClass}
              onClick={() => {
                console.log('save listBox', listBox);
                saveToLocalStorage('listBox', listBox);
              }}>
              Save
            </button>
            <button
              className={buttonDeleteClass}
              onClick={() => setIsDeleted(!isDelete)}>
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className='flex-[0.9]'>
        <div className='container relative border-2 border-black h-[700px] w-[1000px] overflow-hidden'>
          {listBox.map((item, index) => (
            <TableItem
              key={index}
              item={item}
              isDelete={isDelete}
              handelChangePosition={getPosition}
              handelRemoveItem={removeItem}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
