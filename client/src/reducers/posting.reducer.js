import { GET_POSTING,SEARCH_POSTS_SUCCESS } from "../actions/post.actions";

const initialState = {};

export default function postingReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_POSTS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
