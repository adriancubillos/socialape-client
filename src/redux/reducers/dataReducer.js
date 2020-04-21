import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_ONE_SCREAM,
  CREATE_COMMENT
} from '../types';

const initialState = {
  screams: [],
  scream: {},
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      };
    case SET_ONE_SCREAM:
      return {
        ...state,
        scream: action.payload
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
      state.screams[index] = action.payload;
      // if screamId is the same update scream with payload
      if (state.scream.screamId === action.payload.screamId) {
        // BUG Review this as I fixed a bug here.
        // TODO when liking on the scream dialog comments where not being passed as likeScream API response dos not send comments array back.
        //Need to update only the likesCount field
        state.scream = { ...state.scream, likeCount: action.payload.likeCount };
      }
      return {
        ...state
      };
    case DELETE_SCREAM:
      let indexDelete = state.screams.findIndex((scream) => scream.screamId === action.payload);
      state.screams.splice(indexDelete, 1);
      return {
        ...state
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams]
      };
    case CREATE_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments]
        }
      };
    default:
      return state;
  }
}
