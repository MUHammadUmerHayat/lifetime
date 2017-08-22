import React from 'react';
import { browserHistory } from 'react-router';
import moment from 'moment';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Check from 'material-ui/svg-icons/navigation/check';
import { white, cyan600 } from 'material-ui/styles/colors';

const CustomHeader = ({ actionType, onSubmit }) => {
  const style = {
    appBar: {
      top: 0,
      overflow: 'hidden',
      paddingTop: 3,
      paddingLeft: 0,
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

  const handleActionClick = () => {
    if (actionType === 'save') {
      onSubmit();
    }
    
    browserHistory.goBack();
  };

  return (
    <div className="theme-font">
      <AppBar
        title={<h4 style={{ fontWeight: 'bold', marginTop: 20 }}>{moment(new Date()).format('dddd h:mm a')}</h4>}
        style={{ ...style.appBar }}
        iconElementLeft={
          <IconButton style={style.menuButton} onClick={handleActionClick}>
            {actionType === 'save' ?
              <Check color={white} /> :
              <ArrowBack color={white} />
            }
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

CustomHeader.propTypes = {
  actionType: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CustomHeader;
