import React, { useEffect, useRef, useState } from 'react';

const useDraggable = (props) => {
  const boxRef = useRef(null);
  const [positionPre, setPositionPre] = useState(props);
  const position = useRef(props);
  position.current = props;
  const isClicked = useRef(false);
  const coords = useRef({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0
  });

  useEffect(() => {
    if (!boxRef.current) return;
    const box = boxRef.current;

    const onMouseDown = (e) => {
      isClicked.current = true;
      coords.current.startX = e.clientX - props.x;
      coords.current.startY = e.clientY - props.y;
    };

    const onMouseUp = () => {
      isClicked.current = false;
      coords.current.lastX = box.offsetLeft - props.x;
      coords.current.lastY = box.offsetTop - props.y;
    };

    const onMouseMove = (e) => {
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      position.current = { x: nextX, y: nextY };
      setPositionPre({ x: nextX, y: nextY });

      box.style.top = `${nextY}px`;
      box.style.left = `${nextX}px`;
    };

    box.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);

    return () => {
      box.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [props.x, props.y]);

  return [boxRef, position.current, positionPre];
};

export default useDraggable;
