'use client';
import TableItem from '@/components/TableItem';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
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
          type: 'box2',
          position: { x: 100, y: 200 }
        },
        {
          id: '482565bf-435f-450a-bcc6-0c4421034598',
          type: 'box4',
          position: { x: 200, y: 300 }
        },
        {
          id: '820ce129-fb0b-4551-91b8-713d754426a6',
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

  const [isDelete, setIsDeleted] = useState(false);

  const buttonClass =
    'text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2';
  const buttonDeleteClass =
    'text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2';

  return (
    <main className='flex flex-col justify-between items-center pt-5'>
      <div>
        <button
          className={buttonClass}
          onClick={() =>
            setListBox([
              ...listBox,
              { id: uuidv4(), type: 'box2', position: { x: 0, y: 0 } }
            ])
          }>
          Add table
        </button>
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
      <div className='container relative border-2 border-black h-[800px] w-[800px] overflow-hidden'>
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
    </main>
  );
}
