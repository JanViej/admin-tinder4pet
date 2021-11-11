import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@redux/auth/actions';
import { useLocation } from 'react-router';
import { PicCenterOutlined, TeamOutlined } from '@ant-design/icons';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import {
  CardIcon,
  DashboardIcon,
  PuzzleIcon,
  RequestIcon,
  RocketIcon,
  WalletIcon,
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
    key: 'startUps',
    title: 'Startup',
    url: '/startUps',
    icon: PuzzleIcon,
  },
  // {
  //   key: 'coach',
  //   title: 'Coach',
  //   url: '',
  //   icon: UserIcon,
  // },
  {
    key: 'cms',
    title: 'CMS',
    url: '/cms',
    icon: PicCenterOutlined,
  },
  {
    key: 'programs',
    title: 'Programs',
    url: '/programs',
    icon: RocketIcon,
  },
  {
    key: 'users',
    title: 'User Management',
    url: '/users',
    icon: TeamOutlined,
  },
  {
    key: 'orders',
    title: 'Order Management',
    url: '/orders',
    icon: WalletIcon,
    noFill: true,
  },
  {
    key: 'subscriptionPlans',
    title: 'Subscription Plans',
    url: '/subscriptionPlans',
    icon: CardIcon,
    noFill: true,
  },
  {
    key: 'supports',
    title: 'Support request',
    url: '/supports',
    icon: RequestIcon,
    noFill: true,
  },
  // {
  //   key: 'onBoarding',
  //   title: 'On Boarding',
  //   url: '',
  //   icon: OnBoardingIcon,
  // },
  // {
  //   key: 'configuration',
  //   title: 'Configuration',
  //   url: '',
  //   icon: SettingIcon,
  // },
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
