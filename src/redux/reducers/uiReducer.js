import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, STOP_LOADING_UI, GENERAL_ERRORS, CLEAR_GENERAL_ERRORS } from '../types';

const initialState = {
  loading: false,
  errors: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false
      };
    case GENERAL_ERRORS:
      return {
        ...state,
        genErrors: action.payload
      };
    case CLEAR_GENERAL_ERRORS:
      return {
        ...state,
        genErrors: null
      };
    default:
      return state;
  }
}
