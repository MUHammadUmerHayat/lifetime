import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { Modal, Button, Tooltip, Popover, OverlayTrigger } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

import { storiesActions } from '../../states/stories'; 

export default class AddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      location: '',
    };

    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.close = this.close.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.context.store.dispatch(storiesActions.addStory(this.state));
    this.close();
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

  close() {
    this.props.handleCloseForm();
  }

  render() {
    const styles = {
      paper: {
        padding: 30,
      },
      buttons: {
        marginTop: 30,
        textAlign: 'right',
      },
      saveButton: {
        marginLeft: 5,
      },
    };

    return (
      <div>
        <Modal
          style={{ paddingTop: 100 }}
          show={this.props.isOpen}
          onHide={this.close}
        >
          <Paper style={styles.paper}>
            <h3 className="title">Add new story</h3>

            <Divider />
            <form onSubmit={this.onSubmit}>

              <TextField
                hintText="Title"
                floatingLabelText="Title"
                fullWidth
                onChange={this.handleTitleChange}
              />

              <TextField
                hintText="Content"
                floatingLabelText="Content"
                fullWidth
                multiLine
                onChange={this.handleContentChange}
              />

              <TextField
                hintText="Location"
                floatingLabelText="Location"
                fullWidth
                onChange={this.handleLocationChange}
              />

              <div style={styles.buttons}>
                <RaisedButton onClick={this.close} label="Cancel" />
                <RaisedButton
                  label="Save"
                  style={styles.saveButton}
                  type="submit"
                  primary
                />
              </div>
            </form>
          </Paper>
        </Modal>
      </div>
    );
  }
}

AddForm.contextTypes = {
  store: PropTypes.object.isRequired,
};

AddForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCloseForm: PropTypes.func.isRequired,
};

