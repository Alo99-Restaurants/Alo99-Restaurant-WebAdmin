'use client';
import React, { useState } from 'react';
import { Table } from 'antd';

const PrimaryTable = (props) => {
  const {
    dataSource,
    columns,
    rowClassName,
    tableClassName,
    rowKey,
    loading,
    handleSelectRecords,
    ...resProps
  } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    if (typeof handleSelectRecords === 'function') {
      // callback func form props
      handleSelectRecords(newSelectedRowKeys);
    }

    // set keys for rendering the list of selected records
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        }
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        }
      }
    ]
  };

  return (
    <Table
      className={tableClassName}
      rowClassName={rowClassName}
      columns={columns}
      dataSource={dataSource}
      rowSelection={!!dataSource && !!columns && rowSelection}
      rowKey={rowKey}
      loading={loading}
      {...resProps}
    />
  );
};

export default PrimaryTable;
