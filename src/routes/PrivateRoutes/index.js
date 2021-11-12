import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { flatMap, map } from 'lodash';
import { checkRole } from 'utils/tools';
import Home from 'pages/Dashboard';
import Users from 'pages/Users/List';
import PrivateLayoutPage from 'layout/PrivateLayout';

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
    title: 'dashboard.title',
    hasPrivateLayoutWrapper: true,
  },
  {
    path: '/users',
    component: Users,
    exact: true,
    title: 'dashboard.title',
    hasPrivateLayoutWrapper: true,
  },
];

const wrappedRoutes = map(
  flatMap(routes, (route) => {
    if (route.routes) {
      return map(route.routes, (subRoute) => ({
        ...subRoute,
        path: route.path + subRoute.path,
        exact: subRoute.path === '/',
        hasPrivateLayoutWrapper:
          subRoute.hasPrivateLayoutWrapper !== undefined
            ? subRoute.hasPrivateLayoutWrapper
            : route.hasPrivateLayoutWrapper,
        component: subRoute.component || route.component,
      }));
    }
    return route;
  }),
  (route) => <PrivateRoute {...route} key={route.path} />,
);

function PrivateRoute({
  component: Component,
  title,
  hasPrivateLayoutWrapper,
  roles,
  ...rest
}) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  const Wrapper = hasPrivateLayoutWrapper ? PrivateLayoutPage : Fragment;
  return checkRole(roles, role) ? (
    <Route
      {...rest}
      render={
        (props) =>
          isAuthenticated ? (
            <Wrapper>
              <Component />
            </Wrapper>
          ) : (
            <Redirect
              to={{
                pathname: '/sign-in',
                // eslint-disable-next-line
                state: { from: props.location },
              }}
            />
          )
        // eslint-disable-next-line react/jsx-curly-newline
      }
    />
  ) : (
    <Route render={null} />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.any,
  title: PropTypes.string,
  hasPrivateLayoutWrapper: PropTypes.bool,
  roles: PropTypes.array,
};

const PrivateRoutes = () => wrappedRoutes;

export default PrivateRoutes;
