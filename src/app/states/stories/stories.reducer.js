import initialState from '../initial';
import {
  ADD_STORY,
  REMOVE_STORY,
  UPDATE_ALL_STORIES,
} from './stories.actions';

export default function (state = initialState.stories, action = null) {
  switch (action.type) {
    case ADD_STORY:
      return [
        ...state,
        action.payload,
      ];

    case REMOVE_STORY:
      return state.filter(story => story.id !== action.payload.id);

    case UPDATE_ALL_STORIES:
      return action.payload;

    default:
      return [...state];
  }
}
