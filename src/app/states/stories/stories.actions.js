import { localDB } from '../../db';
import binToBlob from '../../utils/binToBlob';
// Action Types
export const ADD_STORY = 'ADD_STORY';
export const REMOVE_STORY = 'REMOVE_STORY';
export const UPDATE_ALL_STORIES = 'UPDATE_ALL_STORIES';

// Actions with pouchdb operations
export function addStory({ title, content, location, imageBinary, imageFile }) {
  const story = {
    id: new Date().toISOString(), // for sorting purposes
    title,
    content,
    location,
    date: new Date(),
  };

  localDB.rel.save('story', story).then((result) => {
    if (imageBinary) {
      localDB.rel.putAttachment(
        'story',
        result.stories[0],
        imageFile.name,
        binToBlob(imageBinary),
        imageFile.type,
      );
    }
  });

  return { type: ADD_STORY, payload: story };
}

export function removeStory(data) {
  localDB.rel.del('story', data);

  return { type: REMOVE_STORY, payload: data };
}

export const updateAllStories = data => ({ type: UPDATE_ALL_STORIES, payload: data });
