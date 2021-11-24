import { Row, Col } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import authBackground from 'assets/images/authBackground.jpg';
import { AuthWrapper } from './style';

const AuthLayout = ({ children }) => {
  return (
    <AuthWrapper>
      <Row className="full-height">
        <Col className="left-side" md={11} sm={0} xs={0}>
          <img src={authBackground} alt="" />
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
