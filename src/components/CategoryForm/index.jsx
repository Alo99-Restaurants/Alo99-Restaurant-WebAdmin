import { Button, Form, Input, InputNumber } from 'antd';
import UploadCategory from '../UploadCategory';
import { useState } from 'react';

function CategoryForm({ form, onFinish, isEdit = false }) {
  const [iconUrl, setIconUrl] = useState('');

  const handleIconChange = (url) => {
    setIconUrl(url);
    form.setFieldsValue({ iconUrl: url });
  };

  return (
    <Form
      layout='horizontal'
      form={form}
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}>
      <Form.Item label='Name' name='name'>
        <Input placeholder='name of category' required />
      </Form.Item>
      <Form.Item label='Icon' name='iconUrl'>
        <UploadCategory onChange={handleIconChange} />
      </Form.Item>
      {!isEdit && (
        <Form.Item className='flex justify-center'>
          <Button type='primary' htmlType='submit'>
            Add
          </Button>
        </Form.Item>
      )}
    </Form>
  );
}

export default CategoryForm;
