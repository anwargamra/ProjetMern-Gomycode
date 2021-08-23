import { GET_POSTING,SEARCH_POSTS_SUCCESS } from "../actions/post.actions";
import { SEARCH_USER_SUCCESS } from "../actions/user.actions";


const initialState = {};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_POSTS_SUCCESS:
      return action.payload;
    case SEARCH_USER_SUCCESS:
        return action.payload;
    default:
      return state;
  }
}