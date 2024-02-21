import { Button, Form, Input, InputNumber, Select } from 'antd';
import UploadCategory from '../UploadCategory';
import { useEffect, useState } from 'react';
import { getMenuCategory } from '@/services/category.service';
import { MENU } from '@/constants';

function MenuForm({ form, onFinish, isEdit }) {
  const { Option } = Select;
  const [menuCategories, setMenuCategories] = useState([]);

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

  const handleIconChange = (url) => {
    form.setFieldsValue({ menuUrl: url });
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
      <Form.Item
        label='Category'
        name='menuCategoryId'
        rules={[{ required: true }]}>
        <Select placeholder='select a category'>
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
        <Select placeholder='select a unit type'>
          {Object.values(MENU.unitType).map((value) => (
            <Option key={value} value={value}>
              {value}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label='Price' name='price' rules={[{ required: true }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item
        label='Icon'
        name='menuUrl'
        rules={[{ required: true, message: "'icon' is required" }]}>
        <UploadCategory onChange={handleIconChange} />
      </Form.Item>
      { !isEdit &&
        <Form.Item className='flex justify-center'>
          <Button type='primary' htmlType='submit'>
            Add
          </Button>
        </Form.Item>
      }
    </Form>
  );
}

export default MenuForm;
