import { Row, Col } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { AuthWrapper } from './style';

const AuthLayout = ({ children }) => {
  return (
    <AuthWrapper>
      <Row className="full-height">
        <Col className="left-side" md={11} sm={0} xs={0}>
          <img src="https://firebasestorage.googleapis.com/v0/b/bookshelf-ad857.appspot.com/o/Auth-Image.png?alt=media&token=ec030cb5-251e-4f91-b596-50777335372f" alt="" />
          <h1>{i18next.t('authPage.title')}</h1>
          <p>{i18next.t('authPage.description')}</p>
        </Col>
        <Col className="right-col" md={13} sm={24} xs={24}>
          <div className="right-side">
            {children}
          </div>
        </Col>
      </Row>
    </AuthWrapper>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthLayout;
