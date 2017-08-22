import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import { white, cyan600 } from 'material-ui/styles/colors';

const Header = ({
  styles,
  handleChangeRequestNavDrawer,
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
    <div className="theme-font">
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
            {/* <IconButton onClick={handleOpenForm}><AddIcon color={white} /></IconButton> */}
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
};

export default Header;
