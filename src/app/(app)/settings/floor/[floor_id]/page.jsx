import SettingTableLayout from '@/components/SettingTableLayout';
import Title from 'antd/es/typography/Title';
import React from 'react';

function FloorDetail(props) {
  const {
    params: { floor_id: floorId }
  } = props;

  return (
    <div className='px-10'>
      <Title className='pb-2' level={3}>
        Sơ đồ tầng {floorId}
      </Title>
      <div>
        <SettingTableLayout />
      </div>
    </div>
  );
}

export default FloorDetail;
