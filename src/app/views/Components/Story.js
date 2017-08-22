import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card, CardTitle, CardText, CardMedia } from 'material-ui/Card';
import { cyan600, cyan700, grey400 } from 'material-ui/styles/colors';

import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { compose, withStateHandlers } from 'recompose';

import { localDB } from '../../db';
import { storiesActions } from '../../states/stories';

const enhance = compose(
  withStateHandlers(
    ({
      previewImage = '',
    }) => ({ previewImage }),
    ({
      handleImageReady: ({ previewImage }) => value => ({
        previewImage: value,
      }),
    }),
  ),
);

const iconButtonElement = (
  <IconButton
    touch
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const Story = ({ story, handleImageReady, previewImage }, { store }) => {
  if (story.attachments && !previewImage) {
    localDB.rel.getAttachment('story', story.id, Object.keys(story.attachments)[0]).then((attachment) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleImageReady(reader.result);
      };

      reader.readAsDataURL(attachment);
    });
  }

  return (
    <Card
      style={{ borderRadius: 0, boxShadow: 0, borderTop: '1px solid #f1f1f1' }}
    >
      {previewImage && (<CardMedia>
        <img src={previewImage} alt="Cover" />
      </CardMedia>)}

      <CardTitle
        title={<span style={{ color: cyan600 }}>{moment(story.date).format('DD, MMMM YYYY')} </span>}
        subtitle={moment(story.date).format('dddd h:mm a')}
      />
      <CardTitle style={{ padding: '0px 16px 0px 16px' }} title={<h2 style={{ color: cyan700 }}>{story.title}</h2>} />
      <CardText>
        {story.content}
      </CardText>
      <IconMenu style={{ float: 'right', zIndex: 0 }} iconButtonElement={iconButtonElement}>
        <MenuItem onClick={() => store.dispatch(storiesActions.removeStory(story))}>
          Delete
      </MenuItem>
      </IconMenu>
      <CardText style={{ color: 'grey' }}>
        <strong>{story.location}</strong>
      </CardText>
    </Card>
  );
};

Story.contextTypes = {
  store: PropTypes.object.isRequired,
};

Story.propTypes = {
  story: PropTypes.object.isRequired,
  handleImageReady: PropTypes.func.isRequired,
  previewImage: PropTypes.string.isRequired,
};

export default enhance(Story);
