import { localDB } from '../db';
import { storiesActions } from '../states/stories';

const changeOpts = { since: 'now', live: true };

/**
 * Pouchdb change listener
 * 
 * Syncs store states from localDB data
 */
export default function syncStore(dispatch) {
  /**
   * Updaters
   */
  const updateStoriesState = () => {
    localDB.rel.find('story').then((res) => {
      const { stories } = res;
      dispatch(storiesActions.updateAllStories(stories || []));
    });
  };

  // All calls when DB changes  
  localDB.changes(changeOpts).on('change', () => {
    updateStoriesState();
  });

  // initial calls here
  updateStoriesState();
}
