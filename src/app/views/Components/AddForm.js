import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import IconAddPhoto from 'material-ui/svg-icons/image/add-a-photo';
import { cyan600 } from 'material-ui/styles/colors';

import CustomHeader from './CustomHeader';

import { storiesActions } from '../../states/stories';

export default class AddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      location: 'Cityland Herrera Tower V.A. Rufino corner Valero Streets, Salcedo Village, Makati, 1227 Metro Manila',      
      previewImage: '',
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
    this.setState({ location: e.target.value });
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
            />
          </BottomNavigation>
        </Paper>
      </div>
    );
  }
}

AddForm.contextTypes = {
  store: PropTypes.object.isRequired,
};
