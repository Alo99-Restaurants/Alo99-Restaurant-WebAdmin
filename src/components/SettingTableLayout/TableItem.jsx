'use client';
import React, { useEffect, useMemo, useState } from 'react';
import useDraggable from '@/hook/useDraggable';

function TableItem(props) {
  const [active, setActive] = useState(false);

  const {
    item: { id, type, position },
    handelChangePosition,
    handelRemoveItem,
    isDelete
  } = props;

  const [boxRef, positionBox, positionRef] = useDraggable(
    position || { x: 0, y: 0 }
  );

  const memoizedInitialStyle = useMemo(() => {
    return {
      top: `${positionBox.y}px`,
      left: `${positionBox.x}px`
    };
  }, [positionBox]);

  const memoizedClassName = useMemo(() => {
    function classNameTableItem(type) {
      if (type === 'box2') {
        return 'absolute bg-orange-500 h-[60px] w-[60px] cursor-pointer select-none';
      } else if (type === 'box3') {
        return 'absolute bg-green-500 h-[60px] w-[60px] cursor-pointer select-none';
      } else if (type === 'box4') {
        return 'absolute bg-blue-500 h-[60px] w-[60px] cursor-pointer select-none';
      }
      return '';
    }
    return classNameTableItem(type);
  }, [type]);

  useEffect(() => {
    handelChangePosition(id, positionRef);
  }, [positionRef]);

  return (
    <div
      id={id}
      ref={boxRef}
      className={memoizedClassName}
      onClick={() => setActive(!active)}
      style={memoizedInitialStyle}>
      {isDelete && (
        <div
          onClick={() => {
            handelRemoveItem(id);
          }}
          className='absolute top-0 right-0 bg-red-500 text-white h-6 w-6 flex items-center justify-center'>
          X
        </div>
      )}
      <div>{type}</div>
    </div>
  );
}

export default TableItem;
