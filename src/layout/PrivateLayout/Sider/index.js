/* eslint-disable */
import React from 'react';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import logo from 'assets/images/logo.png';
import fullLogo from 'assets/images/fullLogo.png';
import logoSVG from 'assets/images/logo.svg';
import { Link } from 'react-router-dom';
import { SiderWrapper } from './styles';

const Sider = ({ menus, isCollapse, selectedKey }) => {
  return (
    <SiderWrapper
      trigger={null}
      collapsible
      collapsed={isCollapse}
      className={`sidebar ${
        isCollapse ? 'sider-section-collapse' : 'sider-section'
      }`}
      collapsedWidth={80}
    >
      <Link to="/">
        <div className="logo">
          {isCollapse && (
            <img className="img collapsed-logo" src={logo} alt="" />
          )}
          <img className="img full-logo" src={logoSVG} alt="" />
        </div>
      </Link>
      <Menu mode="inline">
        {menus?.map((menu, idx) => (
          <Menu.Item
            key={String(idx)}
            className={`${selectedKey === menu.key && 'isSelected'} ${
              !menu.noFill && 'allowFill'
            }`}
          >
            <Link
              className="cms-link-menu-item"
              key={menu.title}
              to={menu.url}
              preload={false}
            >
              <menu.icon />
              <span className="cms-link-item-text">{menu.title}</span>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
      <div className="footer-section">
        {`Copyright ©${new Date().getFullYear()}`}
      </div>
    </SiderWrapper>
  );
};

Sider.propTypes = {
  isCollapse: PropTypes.bool,
  menus: PropTypes.array,
  selectedKey: PropTypes.string,
};

Sider.defaultProps = {
  isCollapse: false,
};

export default Sider;
