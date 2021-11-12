/* eslint-disable */
import React from 'react';
import { Avatar, Dropdown, Button, Menu } from 'antd';
import PropTypes from 'prop-types';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import i18next from 'i18next';
import { Link } from 'react-router-dom';
import { HeaderWrapper } from './styles';

const profileMenu = [
  {
    key: 'profile',
    text: 'header.profile',
    url: '/profile',
  },
];

const Header = ({
  handleLogout,
  isCollapse,
  handleCollapse,
  userName,
  roleName,
  image,
}) => {
  return (
    <HeaderWrapper>
      <div className="searching-section">
        {/* <Button className="menu icon" onClick={handleCollapse}>
          {isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button> */}
      </div>
      <div className="user-section">
        <div className="name">
          <h3>{userName}</h3>
          <p>{roleName}</p>
        </div>
        <div className="avatar">
          <Dropdown
            overlay={() => (
              <Menu style={{ minWidth: '120px' }}>
                {profileMenu.map((menu) => (
                  <Menu.Item key={menu.key}>
                    <Link
                      to={menu.url}
                      style={{ display: 'inline-block', width: '100%' }}
                    >
                      {i18next.t(menu.text)}
                    </Link>
                  </Menu.Item>
                ))}
                <Menu.Divider />
                <Menu.Item onClick={handleLogout} key="logout">
                  {i18next.t('header.logout')}
                </Menu.Item>
              </Menu>
            )}
            trigger={['click']}
          >
            <Avatar size={40} src={image} icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </div>
    </HeaderWrapper>
  );
};

Header.propTypes = {
  isCollapse: PropTypes.bool,
  handleCollapse: PropTypes.func,
  userName: PropTypes.string,
  roleName: PropTypes.string,
  image: PropTypes.string,
  handleLogout: PropTypes.func,
};

Header.defaultProps = {
  isCollapse: false,
};

export default Header;
