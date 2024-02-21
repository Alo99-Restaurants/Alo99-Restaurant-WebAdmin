import React from 'react';
import { Modal } from 'antd';

const PrimaryModal = ({ isOpen, children, onOk, onCancel, confirmLoading, title, width }) => {
  return (
    <Modal
      className='[&_.ant-btn-primary]:bg-[#1677ff]'
      title={title}
      open={isOpen}
      onOk={onOk}
      confirmLoading={confirmLoading}
      width={width}
      onCancel={onCancel}>
      {children}
    </Modal>
  );
};
export default PrimaryModal;
