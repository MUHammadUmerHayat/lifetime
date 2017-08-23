import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import IconPlace from 'material-ui/svg-icons/maps/place';
import IconAddLocation from 'material-ui/svg-icons/maps/add-location';
import Paper from 'material-ui/Paper';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import IconAddPhoto from 'material-ui/svg-icons/image/add-a-photo';
import { cyan600 } from 'material-ui/styles/colors';
import { Row, Col } from 'react-bootstrap';

import CustomHeader from './CustomHeader';
import { getCurrentAddress } from '../../utils/location';

import { storiesActions } from '../../states/stories';

export default class AddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      location: '',
      previewImage: '',
      isOpenLocationDialog: false,
    };

    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleImageChanged = this.handleImageChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    this.context.store.dispatch(storiesActions.addStory(this.state));
    this.state = {};
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleContentChange(e) {
    this.setState({ content: e.target.value });
  }

  handleLocationChange(e) {
    getCurrentAddress('', (location, err) => {
      if (location) {
        this.setState({
          location,
          isOpenLocationDialog: false,
        });
      } else {
        alert(err);
      }
    });
  }

  handleImageChanged(e) {
    const reader = new FileReader();
    const imageFile = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imageFile,
        imageBinary: reader.result,
        previewImage: reader.result,
      });
    };

    reader.readAsDataURL(imageFile);
  }

  render() {
    const styles = {
      paper: {
        padding: 30,
        paddingTop: 0,
        paddingBottom: 50,
        height: 'inherit',
        minHeight: '89vh',
      },
      buttons: {
        marginTop: 30,
        textAlign: 'right',
      },
      saveButton: {
        marginLeft: 5,
      },
      medium: {
        width: 96,
        height: 96,
        padding: 24,
      },
      mediumIcon: {
        color: 'grey',
        width: 48,
        height: 48,
      },
    };

    const customContentStyle = {
      width: '100%',
      maxWidth: 'none',
    };

    let actionType = 'edit';
    if (this.state.title || this.state.content) actionType = 'save';

    return (
      <div className="theme-font">
        <CustomHeader actionType={actionType} onSubmit={this.onSubmit} />
        {/* <Modal
          style={{ paddingTop: 100 }}
          show={this.props.isOpen}
          onHide={this.close}
        > */}
        <Paper style={styles.paper}>
          <form onSubmit={this.onSubmit}>
            <TextField
              hintText="Title"
              floatingLabelText="Title"
              fullWidth
              onChange={this.handleTitleChange}
            />

            <TextField
              floatingLabelText="Write here"
              fullWidth
              multiLine
              onChange={this.handleContentChange}
            />

            {this.state.location &&
              <div>
                <label htmlFor="image" style={{ fontSize: 16, color: cyan600, marginTop: 38 }}>Location</label>
                <div style={{ color: 'grey' }}>
                  <strong>{this.state.location}</strong>
                </div>
              </div>
            }

            {this.state.previewImage &&
              <div>
                <label htmlFor="image" style={{ fontSize: 16, color: cyan600, marginTop: 38 }}>Image attachment</label>
                <img src={this.state.previewImage} className="img-responsive" alt="attachment" />
              </div>
            }
          </form>
        </Paper>
        <Paper zDepth={1}>
          <BottomNavigation style={{ position: 'fixed', bottom: 0, borderTop: '1px solid #f1f1f1' }} selectedIndex={this.state.selectedIndex}>
            <input type="file" accept="image/*" onChange={this.handleImageChanged} className="hidden" ref={(ref) => { this.inputFile = ref; }} />
            <BottomNavigationItem
              icon={<IconAddPhoto />}
              onClick={() => this.inputFile.click()}
            />
            <BottomNavigationItem
              icon={<IconLocationOn />}
              onClick={() => this.setState({ isOpenLocationDialog: true })}
            />

            <Dialog
              modal
              contentStyle={customContentStyle}
              open={this.state.isOpenLocationDialog}
            >
              <Row>
                <Col xs={6} className="text-right">
                  <IconButton
                    iconStyle={styles.mediumIcon}
                    style={styles.medium}
                    onClick={this.handleLocationChange}
                  >
                    <IconPlace />
                  </IconButton><br />
                  Get current &nbsp;
                </Col>

                <Col xs={6} className="text-left">
                  <IconButton
                    iconStyle={styles.mediumIcon}
                    style={styles.medium}
                  >
                    <IconAddLocation />
                  </IconButton><br />
                  &nbsp;Pick a place
                </Col>
              </Row>
            </Dialog>
          </BottomNavigation>
        </Paper>
      </div>
    );
  }
}

AddForm.contextTypes = {
  store: PropTypes.object.isRequired,
};
