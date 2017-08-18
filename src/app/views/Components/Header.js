import React from 'react';
import { compose, getContext, withProps, withStateHandlers } from 'recompose';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Menu from 'material-ui/svg-icons/navigation/menu';
import AddIcon from 'material-ui/svg-icons/content/add';
import { white, cyan600 } from 'material-ui/styles/colors';

import AddForm from './AddForm';

import { authActions } from '../../states/auth';

const enhance = compose(
  getContext({ store: PropTypes.object }),
  withStateHandlers(
    ({
      isFormOpen = false,
    }) => ({ isFormOpen }),
    ({
      handleOpenForm: ({ isFormOpen }) => value => ({
        isFormOpen: true,
      }),
      handleCloseForm: ({ isFormOpen }) => value => ({
        isFormOpen: false,
      }),
    }),
  ),
    withProps(({ store }) => ({ dispatch: store.dispatch })),
  );

const Header = ({
  styles,
  handleChangeRequestNavDrawer,
  isFormOpen,
  handleOpenForm,
  handleCloseForm,
  dispatch,
}, { router }) => {
  const style = {
    appBar: {
      position: 'fixed',
      top: 0,
      overflow: 'hidden',
      paddingTop: 3,
      height: 64,
      backgroundColor: cyan600,
    },
    menuButton: {
      marginLeft: 20,
    },
    iconsRightContainer: {
      marginLeft: 20,
    },
  };

  const routes = router.routes;
  const routeName = routes[routes.length - 1].name || '';
  
  return (
    <div>
      <AppBar
        title={routeName}
        style={{ ...styles, ...style.appBar }}
        iconElementLeft={
          <IconButton style={style.menuButton} onClick={handleChangeRequestNavDrawer}>
            <Menu color={white} />
          </IconButton>
        }
        iconElementRight={
          <div style={style.iconsRightContainer}>
            <IconButton onClick={handleOpenForm}><AddIcon color={white} /></IconButton>
            <AddForm isOpen={isFormOpen} handleCloseForm={handleCloseForm} />
          </div>
        }
      />
    </div>
  );
};

Header.contextTypes = {
  router: PropTypes.object.isRequired,
};

Header.propTypes = {
  styles: PropTypes.object.isRequired,
  handleChangeRequestNavDrawer: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  isFormOpen: PropTypes.bool.isRequired,
  handleOpenForm: PropTypes.func.isRequired,
  handleCloseForm: PropTypes.func.isRequired,
};

export default enhance(Header);
