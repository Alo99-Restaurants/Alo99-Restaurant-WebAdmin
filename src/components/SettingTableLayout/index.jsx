'use client';
import TableItem from '@/components/SettingTableLayout/TableItem';
import { useNotification } from '@/context/NotificationContext';
import { stringifyData } from '@/helper';
import { updateFloorTablesService } from '@/services/restaurant.table.service';
import { Input, Modal, Select } from 'antd';
import { memo, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const SettingTableLayout = ({ floorId, floorTables, onSaveLayout }) => {
  const { addNotification } = useNotification();
  const [typeBox, setTypeBox] = useState(2);
  const [direction, setDirection] = useState('horizontal');
  const [listBox, setListBox] = useState(floorTables ?? []);
  const [isDelete, setIsDeleted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(null);

  const EditModal = () => {
    const [inputTableName, setInputTableName] = useState();
    const tableEdit =
      listBox && !!openModalEdit && listBox.find((_) => _.id === openModalEdit);
    const tableId = openModalEdit;

    const handleUpdateTableName = async () => {
      const updatedData = listBox.map((item) => {
        if (item.id === tableId) {
          return { ...item, tableName: inputTableName };
        }
        return item;
      });
      const payloadsTables = updatedData.map((table) => {
        return {
          restaurantFloorId: floorId,
          tableName: table.tableName ?? 'table new',
          tableType: table.type,
          capacity: table.capacity ?? table.type,
          extensionData: stringifyData({
            width: table.width,
            height: table.height,
            position: { x: table.position.x, y: table.position.y },
            direction: table.direction
          })
        };
      });
      const payload = {
        restaurantFloorId: floorId,
        tables: payloadsTables
      };

      const res = await updateFloorTablesService(payload);
      if (res?.data) {
        // addNotification('Update layout successful', 'success');
        onSaveLayout(floorId);
      }
      setOpenModalEdit(null);
    };

    return (
      <Modal
        className={'[&_.ant-btn-primary]:bg-[#1677ff]'}
        title='Edit table name'
        open={!!openModalEdit}
        onOk={handleUpdateTableName}
        confirmLoading={false}
        onCancel={() => setOpenModalEdit(null)}>
        <Input
          onChange={(e) => setInputTableName(e.target.value)}
          defaultValue={tableEdit?.tableName}
          placeholder='table name'
        />
      </Modal>
    );
  };

  const ratioMap = 1000 / 700;

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

  const handelEditItem = (id) => {
    setOpenModalEdit(id);
  };

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
          position: { x: table.position.x, y: table.position.y },
          direction: table.direction
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

  const getSizeTableIcon = (type) => {
    switch (Number(type)) {
      case 2:
        return { width: 132, height: 60 };
      case 4:
        return { width: 132, height: 132 };
      case 6:
        return { width: 132, height: 150 };
      case 8:
        return { width: 132, height: 222 };
      case 10:
        return { width: 132, height: 267 };
      case 12:
        return { width: 175, height: 267 };
      default:
        return { width: 0, height: 0 };
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
                { value: 2, label: 'Bàn 2 người' },
                { value: 4, label: 'Bàn 4 người' },
                { value: 6, label: 'Bàn 6 người' },
                { value: 8, label: 'Bàn 8 người' },
                { value: 10, label: 'Bàn 10 người' },
                { value: 12, label: 'Bàn 12 người' }
              ]}
            />
            <Select
              defaultValue={0}
              className='me-2 mb-2'
              value={direction}
              onChange={(direction) => setDirection(direction)}
              options={[
                { value: 'horizontal', label: 'Horizontal' },
                { value: 'vertical', label: 'Vertical' }
              ]}
            />
            <button
              className={buttonClass}
              onClick={() =>
                setListBox([
                  ...listBox,
                  {
                    id: uuidv4(),
                    direction,
                    width: getSizeTableIcon(typeBox).width * 1.5,
                    height: getSizeTableIcon(typeBox).height * 1.5,
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
            <button className={buttonClass} onClick={() => setIsEdit(!isEdit)}>
              Edit name
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
              isEdit={isEdit}
              handelEditItem={handelEditItem}
              handelChangePosition={getPosition}
              handelRemoveItem={removeItem}
            />
          ))}
        </div>
      </div>
      {openModalEdit && <EditModal />}
    </main>
  );
};

export default memo(SettingTableLayout);
