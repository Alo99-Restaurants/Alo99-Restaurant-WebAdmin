'use client';
import { Button, Form, Input, Space } from 'antd';

function RestaurantInfoForm({ form, onFinish }) {
  return (
    <Form
      layout='horizontal'
      form={form}
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 19 }}
      style={{ maxWidth: '100%' }}>
      <Form.Item label='Name' name='name'>
        <Input />
      </Form.Item>
      <Form.Item label='Address' name='address'>
        <Input />
      </Form.Item>
      <Form.Item label='Location' name='location'>
        <Input />
      </Form.Item>
      <Form.Item label='Greetings' name='greetings'>
        <Input />
      </Form.Item>
      <Form.Item label='Open Hours' name='openHours'>
        <Input />
      </Form.Item>
      <Form.Item label='Close Hours' name='closeHours'>
        <Input />
      </Form.Item>
      <Form.Item label='Phone Number' name='phoneNumber'>
        <Input />
      </Form.Item>
      <Form.Item label='Capacity' name='capacity'>
        <Input />
      </Form.Item>
      <Form.Item label='Total Floors' name='totalFloors'>
        <Input />
      </Form.Item>
      <Form.Item className='flex justify-center'>
        <Button type='primary' htmlType='submit'>
          Update Restaurant Info
        </Button>
      </Form.Item>
    </Form>
  );
}

export default RestaurantInfoForm;
