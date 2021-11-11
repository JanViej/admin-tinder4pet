import React from 'react';
import DrawerStyles from './styles';

const Drawer = (props) => (
  <DrawerStyles closable={false} {...props} destroyOnClose />
);

Drawer.propTypes = {};

export default Drawer;
