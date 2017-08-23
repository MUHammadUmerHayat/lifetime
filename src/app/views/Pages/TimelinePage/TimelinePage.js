import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import { compose, getContext, withStateHandlers } from 'recompose';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { cyan600 } from 'material-ui/styles/colors';
import DashboardView from '../../Layouts/DashboardView';
import Story from '../../Components/Story';

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
);

/* eslint-disable no-underscore-dangle */
const TimelinePage = ({
  stories,
  handleOpenForm,
  handleCloseForm,
  isFormOpen,
}) => {
  const styles = {
    floatingActionButton: {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    },
  };

  return (<DashboardView
    title="Timeline"
  >

    <Row style={{ marginRight: '-35px', marginLeft: '-30px', marginBottom: '-20px', marginTop: '-1px' }}>
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

    <Link to="/timeline/add" >
      <FloatingActionButton
        style={styles.floatingActionButton}
        backgroundColor={cyan600}
      >
        <ContentAdd />
      </FloatingActionButton>
    </Link>

  </DashboardView>
  );
};

TimelinePage.defaultProps = {
  stories: [],
};

TimelinePage.propTypes = {
  stories: PropTypes.array,
  isFormOpen: PropTypes.bool.isRequired,
  handleOpenForm: PropTypes.func.isRequired,
  handleCloseForm: PropTypes.func.isRequired,
};

function mapState({ stories }) {
  return { stories };
}

export default connect(mapState)(enhance(TimelinePage));
