import React, { useEffect, useMemo, useState } from 'react';
import useDraggable from '@/hook/useDraggable';
import Image from 'next/image';
import { EditOutlined } from '@ant-design/icons';

function TableItem(props) {
  const [active, setActive] = useState(false);
  const {
    item: {
      id,
      type,
      tableName,
      position,
      height,
      width,
      direction = 'horizontal'
    },
    handelChangePosition,
    handelEditItem,
    handelRemoveItem,
    isEdit,
    isDelete
  } = props;

  const [boxRef, positionBox, positionRef] = useDraggable(
    position || { x: 0, y: 0 }
  );

  const memoizedInitialStyle = useMemo(
    () => ({
      top: `${positionBox.y}px`,
      left: `${positionBox.x}px`
    }),
    [positionBox]
  );

  useEffect(() => {
    handelChangePosition(id, positionRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionRef]);

  const renderTableIcon = (type) => {
    const tableIcons = {
      2: 'Table2',
      4: 'Table4',
      6: 'Table6',
      8: 'Table8',
      10: 'Table10',
      12: 'Table12'
    };

    const iconSrc =
      tableIcons[type] &&
      require(`../../assets/table_icon/${tableIcons[type]}.png`);

    return (
      <Image
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        src={iconSrc}
        alt={`Table Icon ${type}`}
        width={Number(width)}
        draggable={false}
      />
    );
  };

  return (
    <div
      id={id}
      ref={boxRef}
      className={`absolute cursor-pointer select-none ${
        direction === 'horizontal' ? 'rotate-90' : ''
      }`}
      style={{ ...memoizedInitialStyle, width: width, height: height }}
      onClick={() => setActive(!active)}>
      {renderTableIcon(type)}
      <div
        className={`${direction === 'horizontal' ? '-rotate-90' : ''}`}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
        {tableName}
      </div>
      {isDelete && (
        <div
          onClick={() => handelRemoveItem(id)}
          className={`${
            direction === 'horizontal' ? '-rotate-90' : ''
          } bg-red-500 text-white h-10 w-10 flex items-center justify-center`}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}>
          X
        </div>
      )}
      {isEdit && (
        <div
          onClick={() => handelEditItem(id)}
          className={`${
            direction === 'horizontal' ? '-rotate-90' : ''
          } bg-blue-600 text-white h-10 w-10 flex items-center justify-center`}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}>
          <EditOutlined />
        </div>
      )}
    </div>
  );
}

export default TableItem;
