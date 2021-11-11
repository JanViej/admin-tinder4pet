import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router';
import Modal from 'components/common/Modal';
// import Drawer from 'components/common/Drawer';
// import { CustomModalWrapper } from './styles';

const modalRoutes = [];

let modal = null;
let Container = Modal;

const getModalRoute = (currentModal) => {
  const modalRoute =
    currentModal &&
    modalRoutes.find((route) => currentModal.search(route.path) > -1);
  if (modalRoute) {
    return modalRoute.routes.find(
      (route) => currentModal.indexOf(route.path) > -1,
    );
  }
  return modalRoute;
};

const ModalRoute = () => {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (location.hash && location.hash !== '#') {
      const modelRoute = location.hash.replace('#', '/');
      modal = getModalRoute(modelRoute);
    }
    // eslint-disable-next-line
  }, [location.hash]);
  const closeModal = () => {
    history.replace(`${location.pathname}${location.search}`);
  };

  const modelRoute = location.hash.replace('#', '/');
  modal = getModalRoute(modelRoute) || modal;
  const modalOptions = modal && modal?.modalOptions ? modal?.modalOptions : {};
  // let Container = Modal;
  if(modal?.container) Container = modal.container;

  return (
    <Container
      {...modalOptions}
      visible={!!(location.hash && location.hash !== '#')}
      footer={null}
      onCancel={closeModal}
      onClose={closeModal}
      {...modal?.width && {
        width: modal.width,
      }}
      hideTitle={modal?.hideTitle}
    >
      {modal?.component && (
        <modal.component
          showModal
          visibleModal={!!(location.hash && location.hash !== '#')}
          location={location}
        />
      )}
    </Container>
  );
};

ModalRoute.propTypes = {
  location: PropTypes.object,
  currentModal: PropTypes.string,
  closeModal: PropTypes.func,
  showModal: PropTypes.func,
  replaceRoute: PropTypes.func,
};

export default ModalRoute;
