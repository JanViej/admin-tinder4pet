import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { EyeOutlined } from '@ant-design/icons';

const FormItem = Form.Item;

const SignInForm = ({ loading, onSubmit, loadingGoogle }) => {
  const [isShow, setIsShow] = useState(false);
  const onFinish = (values) => onSubmit(values);
  return (
    <>
      <Form requiredMark={false} layout="vertical" onFinish={onFinish}>
        <h1>Login</h1>
        <p>Sign in to manage tinder4pet</p>
        <div className="form-content">
          <FormItem
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Email is required' }]}
          >
            <Input />
          </FormItem>
          <FormItem
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Password is required' }]}
          >
            <Input
              type={isShow ? 'text' : 'password'}
              suffix={<EyeOutlined onClick={() => setIsShow(!isShow)} />}
            />
          </FormItem>
          <Button loading={loading} htmlType="submit" className="custom-btn" disabled={loadingGoogle}>
            Login
          </Button>
        </div>
      </Form>
    </>
  );
};

SignInForm.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
  loadingGoogle: PropTypes.bool,
}

SignInForm.defaultProps = {
  onSubmit: () => {},
}

export default SignInForm;
