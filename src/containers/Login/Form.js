import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import i18next from 'i18next';

const FormItem = Form.Item;

const SignInForm = ({ loading, onSubmit, loadingGoogle }) => {
  const [isShow, setIsShow] = useState(false);
  const onFinish = (values) => onSubmit(values);
  return (
    <>
      <Form requiredMark={false} layout="vertical" onFinish={onFinish}>
        <h1>{i18next.t('signIn.title')}</h1>
        <p>{i18next.t('signIn.description')}</p>
        <div className="form-content">
          <FormItem
            name="email"
            label={i18next.t('signIn.email')}
            rules={[{ required: true, message: i18next.t('emailRequire') }]}
          >
            <Input placeholder={i18next.t('signIn.emailPlaceholder')} />
          </FormItem>
          <FormItem
            name="password"
            label={i18next.t('signIn.password')}
            rules={[{ required: true, message: i18next.t('passwordRequire') }]}
          >
            <Input
              type={isShow ? 'text' : 'password'}
              placeholder={i18next.t('signIn.passwordPlaceholder')}
              suffix={<EyeOutlined onClick={() => setIsShow(!isShow)} />}
            />
          </FormItem>
          <Button loading={loading} htmlType="submit" className="custom-btn" disabled={loadingGoogle}>
            {i18next.t('signIn.submitText')}
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
