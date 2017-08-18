import React from 'react';
import PropTypes from 'prop-types';
import withWidth, { LARGE, SMALL } from 'material-ui/utils/withWidth';
import Swipeable from 'react-swipeable';
import Header from '../Components/Header';
import LeftDrawer from '../Components/LeftDrawer';
import Data from '../Config/data';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: false,
    };

    this.handleChangeRequestNavDrawer = this.handleChangeRequestNavDrawer.bind(this);
    this.swipingLeft = this.swipingLeft.bind(this);
    this.swipingRight = this.swipingRight.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({ navDrawerOpen: nextProps.width === LARGE });
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
    });
  }

  swipingLeft(e, absX) {
    this.setState({
      navDrawerOpen: false,
    });
  }

  swipingRight(e, absX) {
    this.setState({
      navDrawerOpen: true,
    });
  }

  render() {
    const { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 280;

    const styles = {
      header: {
        paddingLeft: 0,
      },
      container: {
        margin: '64px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0,
      },
    };
    return (
      <Swipeable
        onSwipingLeft={this.swipingLeft}
        onSwipingRight={this.swipingRight}
      >
        <Header
          styles={styles.header}
          handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer}
        />

        <LeftDrawer
          navDrawerOpen={navDrawerOpen}
          menus={Data.menus}
          username="Administrator"
          handleChangeNavDrawer={this.handleChangeRequestNavDrawer}
        />

        <div style={styles.container}>
          {this.props.children}
        </div>
      </Swipeable >
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  width: PropTypes.number.isRequired,
};

export default withWidth()(App);
