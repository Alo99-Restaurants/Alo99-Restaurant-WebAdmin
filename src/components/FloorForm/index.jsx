'use client';
import { Button, Form, Input, InputNumber, Space } from 'antd';

function FloorForm({ form, onFinish }) {
  return (
    <Form
      layout='horizontal'
      form={form}
      initialValues={{
        floorNumber: 1,
        capacity: 10
      }}
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 19 }}
      style={{ maxWidth: '100%' }}>
      <Form.Item label='Name' name='name'>
        <Input placeholder='name of floor' required />
      </Form.Item>
      <Form.Item label='Floor Number' name='floorNumber'>
        <InputNumber min={1} max={99} />
      </Form.Item>
      <Form.Item label='Capacity' name='capacity'>
        <InputNumber min={1} max={99} />
      </Form.Item>
      <Form.Item className='flex justify-center'>
        <Button type='primary' htmlType='submit'>
          Add New Floor
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FloorForm;
