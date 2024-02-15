import { Button, Form, Input, InputNumber, Select } from 'antd';
import UploadCategory from '../UploadCategory';
import { useEffect, useState } from 'react';
import { getMenuCategory } from '@/services/category.service';
import { MENU } from '@/constants';

function MenuForm({ form, onFinish }) {
  const { Option } = Select;
  const [iconUrl, setIconUrl] = useState('');
  const [menuCategories, setMenuCategories] = useState([]);

  console.log('menuCategories', menuCategories);

  const fetchMenuCategory = async () => {
    try {
      const response = await getMenuCategory();
      const menuCategories = response?.data?.items;
      if (menuCategories) {
        setMenuCategories(menuCategories);
      }
    } catch (error) {
      console.error('Fetch Menu Category Error', error);
    }
  };

  useEffect(() => {
    fetchMenuCategory();
  }, []);

  const onGenderChange = (value) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        break;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        break;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
        break;
      default:
    }
  };

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
      <Form.Item label='Name' name='name' rules={[{ required: true }]}>
        <Input placeholder='name of food' />
      </Form.Item>
      <Form.Item label='Category' name='category' rules={[{ required: true }]}>
        <Select placeholder='select a category' onChange={onGenderChange}>
          {menuCategories.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label='Description'
        name='description'
        placeholder='description'
        rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item label='Unit Type' name='unitType' rules={[{ required: true }]}>
        <Select placeholder='select a unit type' onChange={onGenderChange}>
          {Object.values(MENU.unitType).map((value) => (
            <Option key={value} value={value}>
              {value}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label='Icon' name='iconUrl' rules={[{ required: true, message: "'icon' is required"  }]}>
        <UploadCategory onChange={handleIconChange} />
      </Form.Item>
      <Form.Item className='flex justify-center'>
        <Button type='primary' htmlType='submit'>
          Add
        </Button>
      </Form.Item>
    </Form>
  );
}

export default MenuForm;
