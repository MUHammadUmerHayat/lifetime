import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import { cyan600 } from 'material-ui/styles/colors';
import DashboardView from '../../Layouts/DashboardView';
import Story from '../../Components/Story';

/* eslint-disable no-underscore-dangle */
const TimelinePage = ({ stories }) => (
  <DashboardView
    title="Timeline"
  >

    <Row style={{ marginRight: '-35px', marginLeft: '-30px', marginBottom: '-20px' }}>
      {
        stories.length > 0 ? stories.sort((a, b) => a.id < b.id).map(story => (
          <Story
            key={story.id}
            story={story}
          />
        )) : (
          <div className="text-center" style={{ color: cyan600, marginTop: 200 }}>
            <h2>No stories yet</h2>
            <h4>Why not add one?</h4>
          </div>
        )
      }
    </Row>

  </DashboardView>
);

TimelinePage.defaultProps = {
  stories: [],
};

TimelinePage.propTypes = {
  stories: PropTypes.array,
};

function mapState({ stories }) {
  return { stories };
}

export default connect(mapState)(TimelinePage);
