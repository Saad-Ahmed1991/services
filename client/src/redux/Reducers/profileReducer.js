import {
  CREATE_PROFILE_FAIL,
  CREATE_PROFILE_LOADING,
  CREATE_WORKER_PROFILE_FAIL,
  CREATE_WORKER_PROFILE_LOADING,
  GET_CURRENT_PROFILE_FAIL,
  GET_CURRENT_PROFILE_LOADING,
  GET_CURRENT_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_LOADING,
  UPLOAD_PROFILE_IMAGE_FAIL,
  UPLOAD_PROFILE_IMAGE_LOADING,
} from "../Consts/profileConsts";

const initialState = {
  errors: null,
  currentProfile: {},
  loading: false,
};

export const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CURRENT_PROFILE_LOADING:
      return { ...state, loading: true };
    case GET_CURRENT_PROFILE_SUCCESS:
      return { ...state, currentProfile: payload, loading: false };
    case GET_CURRENT_PROFILE_FAIL:
      return { ...state, errors: payload, loading: false };
    case UPLOAD_PROFILE_IMAGE_LOADING:
      return { ...state, loading: true };
    case UPLOAD_PROFILE_IMAGE_FAIL:
      return { ...state, errors: payload, loading: false };
    case UPDATE_PROFILE_LOADING:
      return { ...state, loading: true };
    case UPDATE_PROFILE_FAIL:
      return { ...state, errors: payload, loading: false };
    case CREATE_PROFILE_LOADING:
      return { ...state, loading: true };
    case CREATE_PROFILE_FAIL:
      return { ...state, errors: payload, loading: false };
    case CREATE_WORKER_PROFILE_LOADING:
      return { ...state, loading: true };
    case CREATE_WORKER_PROFILE_FAIL:
      return { ...state, errors: payload, loading: false };

    default:
      return state;
  }
};
