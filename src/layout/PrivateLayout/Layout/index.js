import React, { useState } from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import Sider from '../Sider';
import Header from '../Header';
import { PrivateLayoutWrapper } from './styles';

const { Content } = Layout;

const PrivateLayout = ({
  handleLogout,
  children,
  selectedKey,
  menus,
  userName,
  roleName,
  avt,
}) => {
  const [isCollapse, setCollapse] = useState(false);

  const handleCollapse = () => {
    setCollapse((isCollapse) => !isCollapse);
  };

  return (
    <PrivateLayoutWrapper>
      <Layout>
        <input id="collapsedTracker" type="checkbox" checked={!isCollapse} />
        <label
          role="presentation"
          htmlFor="collapsedTracker"
          className="overlay"
          onClick={handleCollapse}
        />
        <Sider
          menus={menus}
          selectedKey={selectedKey}
          isCollapse={isCollapse}
        />
        <Layout className="page-content-wrapper">
          <Header
            handleLogout={handleLogout}
            handleCollapse={handleCollapse}
            isCollapse={isCollapse}
            userName={userName}
            roleName={roleName}
            image={avt}
          />
          <Content className="page-content">{children}</Content>
        </Layout>
      </Layout>
    </PrivateLayoutWrapper>
  );
};

PrivateLayout.propTypes = {
  children: PropTypes.node,
  selectedKey: PropTypes.string,
  menus: PropTypes.array,
  userName: PropTypes.string,
  roleName: PropTypes.string,
  avt: PropTypes.string,
  handleLogout: PropTypes.func,
};

PrivateLayout.defaultProps = {
  handleLogout: () => {},
};

export default PrivateLayout;
