import {
  DELETE_USER_FAIL,
  DELETE_USER_LOADING,
  EDIT_USER_FAIL,
  EDIT_USER_LOADING,
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_LOADING,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_WORKERS_FAIL,
  GET_ALL_WORKERS_LOADING,
  GET_ALL_WORKERS_SUCCESS,
  GET_CURRENT_USER_FAIL,
  GET_CURRENT_USER_LOADING,
  GET_CURRENT_USER_SUCCESS,
  LOG_IN_FAIL,
  LOG_IN_SUCCESS,
  LOG_OUT,
  SIGN_UP_FAIL,
} from "../Consts/userConsts";

const initialState = {
  errors: null,
  currentUser: {},
  allUsers: [],
  allWorkers: [],
  loading: false,
};
export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_UP_FAIL:
      return { ...state, errors: payload };
    case LOG_IN_FAIL:
      return { ...state, errors: payload.response.data.msg };
    case LOG_IN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        currentUser: payload.user,
      };
    case LOG_OUT:
      localStorage.removeItem("token");
      return {
        errors: null,
        currentUser: {},
      };
    case GET_CURRENT_USER_LOADING:
      return { ...state, loading: true };
    case GET_CURRENT_USER_FAIL:
      return { ...state, errors: payload, loading: false };
    case GET_CURRENT_USER_SUCCESS:
      return { ...state, currentUser: payload.user, loading: false };
    case GET_ALL_USERS_LOADING:
      return { ...state, loading: true };
    case GET_ALL_USERS_FAIL:
      return { ...state, errors: payload, loading: false };
    case GET_ALL_USERS_SUCCESS:
      return { ...state, allUsers: payload, loading: false };
    case DELETE_USER_LOADING:
      return { ...state, loading: true };
    case DELETE_USER_FAIL:
      return { ...state, errors: payload, loading: false };
    case EDIT_USER_FAIL:
      return { ...state, errors: payload, loading: false };
    case EDIT_USER_LOADING:
      return { ...state, loading: true };
    case GET_ALL_WORKERS_LOADING:
      return { ...state, loading: true };
    case GET_ALL_WORKERS_FAIL:
      return { ...state, errors: payload, loading: false };
    case GET_ALL_WORKERS_SUCCESS:
      return { ...state, allWorkers: payload, loading: false };

    default:
      return state;
  }
};
