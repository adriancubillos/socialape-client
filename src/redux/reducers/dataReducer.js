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
      // BUG Review this as I fixed a bug here.
      // TODO when commenting on the scream dialog commentCount was not updating in scram nor in screams.
      let indexCreateComment = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
      // if screamId is the same update commentCount in screams and scream
      if (state.scream.screamId === action.payload.screamId) {
        //Need to update only the commentsCount field on the scream
        state.scream = { ...state.scream, commentCount: state.scream.commentCount + 1 };
        //Need to replace the scream in the screams with the recently updated scream containing the new comment count
        state.screams = [
          ...state.screams.slice(0, indexCreateComment),
          state.scream,
          ...state.screams.slice(indexCreateComment + 1)
        ];
      }
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
