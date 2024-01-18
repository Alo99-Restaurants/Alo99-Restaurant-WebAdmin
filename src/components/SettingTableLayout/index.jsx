'use client';
import TableItem from '@/components/SettingTableLayout/TableItem';
import { useNotification } from '@/context/NotificationContext';
import { stringifyData } from '@/helper';
import { updateFloorTablesService } from '@/services/restaurant.table.service';
import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function SettingTableLayout({
  floorId,
  floorTables,
  onSaveLayout
}) {
  const { addNotification } = useNotification();
  const [typeBox, setTypeBox] = useState(2);
  const [listBox, setListBox] = useState(floorTables);

  useEffect(() => {
    setListBox(floorTables);
  }, [floorTables]);

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

  const handleSaveFloorTables = async () => {
    const payloadsTables = listBox.map((table) => {
      return {
        restaurantFloorId: floorId,
        tableName: table.tableName ?? 'table new',
        tableType: table.type,
        capacity: table.capacity ?? table.type,
        extensionData: stringifyData({
          width: table.width,
          height: table.height,
          position: { x: table.position.x, y: table.position.y }
        })
      };
    });

    const payload = {
      restaurantFloorId: floorId,
      tables: payloadsTables
    };

    const res = await updateFloorTablesService(payload);
    if (res?.data) {
      addNotification('Update layout successful', 'success');
      onSaveLayout(floorId);
    }
  };

  return (
    <main className='flex flex-row justify-between'>
      <div className='flex-[0.1]'>
        <div className='flex flex-col h-full'>
          <div className='add-table flex flex-col'>
            <Select
              defaultValue={2}
              className='me-2 mb-2'
              value={typeBox}
              onChange={handleChangeSelect}
              options={[
                { value: 2, label: 'Bàn 2' },
                { value: 3, label: 'Bàn 3' },
                { value: 4, label: 'Bàn 4' }
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
            <button className={buttonClass} onClick={handleSaveFloorTables}>
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
