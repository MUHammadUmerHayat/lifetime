import { localDB } from '../../db';
// Action Types
export const ADD_STORY = 'ADD_STORY';
export const REMOVE_STORY = 'REMOVE_STORY';
export const UPDATE_ALL_STORIES = 'UPDATE_ALL_STORIES';

// Actions with pouchdb operations
export function addStory(data) {
  const story = { ...data };
  story.id = new Date().toISOString(); // for sorting purposes
  story.date = new Date();
  localDB.rel.save('story', story);

  return { type: ADD_STORY, payload: story };
}

export function removeStory(data) {
  localDB.rel.del('story', data);

  return { type: REMOVE_STORY, payload: data };
}

export const updateAllStories = data => ({ type: UPDATE_ALL_STORIES, payload: data });
