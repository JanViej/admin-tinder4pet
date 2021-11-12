import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@redux/auth/actions';
import { useLocation } from 'react-router';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import {
  DashboardIcon,
  PuzzleIcon,
} from 'components/common/SVGIcon';
import PrivateLayout from './Layout';
import { PrivateLayoutWrapper } from './styles';

const listMenu = [
  {
    key: 'dashboard',
    title: 'Dashboard',
    url: '/',
    icon: DashboardIcon,
  },
  {
    key: 'users',
    title: 'Users',
    url: '/users',
    icon: PuzzleIcon,
  },
  {
    key: 'applications',
    title: 'Applications',
    url: '/applications',
    icon: PuzzleIcon,
  },
  {
    key: 'vets',
    title: 'Vets',
    url: '/vets',
    icon: PuzzleIcon,
  },
  {
    key: 'settings',
    title: 'Settings',
    url: '/settings/introSliders',
    icon: PuzzleIcon,
  },
];

const getCurrentTab = (str, key) => {
  const paths = str && str.split('/');
  return paths && paths[key];
};

const PrivateLayoutPage = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const url = getCurrentTab(location.pathname, 1);
  const user = useSelector((state) => state.auth.data);

  useEffect(() => {
    i18next.changeLanguage('en');
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <PrivateLayoutWrapper>
      <PrivateLayout
        userName={`${user?.firstName || ''} ${user?.lastName || ''}`}
        roleName={user?.email}
        avt={user.avatar}
        menus={listMenu}
        selectedKey={url || 'dashboard'}
        handleLogout={handleLogout}
      >
        {children}
      </PrivateLayout>
    </PrivateLayoutWrapper>
  );
};

PrivateLayoutPage.propTypes = {
  children: PropTypes.node,
};

export default PrivateLayoutPage;
