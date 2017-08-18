import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { cyan600, cyan700, grey400 } from 'material-ui/styles/colors';

import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { storiesActions } from '../../states/stories';

const iconButtonElement = (
  <IconButton
    touch
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const Story = ({ story }, { store }) => (
  <Card
    style={{ borderRadius: 0, boxShadow: 0, borderTop: '1px solid #f1f1f1' }}
  >
    {/* <CardMedia>
      <img src={require('../Images/material_bg.png')} alt="" />
    </CardMedia> */}

    <CardTitle
      title={<span style={{ color: cyan600 }}>{moment(story.date).format('DD, MMMM YYYY')} </span>}
      subtitle={moment(story.date).format('dddd h:mm a')}
    />
    <CardTitle style={{ padding: '0px 16px 0px 16px' }} title={<h2 style={{ color: cyan700 }}>{story.title}</h2>} />
    <CardText>
      {story.content}
    </CardText>
    <IconMenu style={{ float: 'right' }} iconButtonElement={iconButtonElement}>
      <MenuItem onClick={() => store.dispatch(storiesActions.removeStory(story))}>
        Delete
      </MenuItem>
    </IconMenu>
    <CardText style={{ color: 'grey' }}>
      <strong>{story.location}</strong>
    </CardText>
  </Card>
);

Story.contextTypes = {
  store: PropTypes.object.isRequired,
};

Story.propTypes = {
  story: PropTypes.object.isRequired,
};

export default Story;
