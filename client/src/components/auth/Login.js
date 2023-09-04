import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import {Login} from '../../actions/auth';

const LoginForm = () => {
  const onFinish = (values) => {
    // console.log('Form values:', values);
    Login(values.employeeID, values.password, values.rememberMe)
    // Add your login logic here
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form onFinish={onFinish} style={{ width: 300 }}>
        <Form.Item name="employeeID" label="EmployeeID" rules={[{ required: true }]}>
          <Input placeholder="Enter your ID" />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item name="rememberMe" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Log In
          </Button>
        </Form.Item>

        <div style={{ textAlign: 'center' }}>
          <Button icon={<GoogleOutlined />} size="large">
            Sign in with Google
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;