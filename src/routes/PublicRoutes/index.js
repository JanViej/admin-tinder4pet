import React from 'react';
import { Route } from 'react-router-dom';
import Login from 'pages/Login';

export const PUBLIC_ROUTES = [
  {
    path: '/sign-in',
    component: Login,
    exact: true,
  },
];

const publicRoutes = () =>
  PUBLIC_ROUTES.map((route) => <Route {...route} key={route.path} />);

export default publicRoutes;
