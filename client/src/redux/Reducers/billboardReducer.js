import {
  ADD_IMAGES_TO_BILLBOARD_FAIL,
  ADD_IMAGES_TO_BILLBOARD_LOADING,
  ADD_IMAGES_TO_BILLBOARD_SUCCESS,
  CREATE_BILLBOARD_FAIL,
  CREATE_BILLBOARD_LOADING,
  CREATE_BILLBOARD_SUCCESS,
  GET_BILLBOARD_FAIL,
  GET_BILLBOARD_LOADING,
  GET_BILLBOARD_SUCCESS,
  GET_HOME_BILLBOARD_FAIL,
  GET_HOME_BILLBOARD_LOADING,
  GET_HOME_BILLBOARD_SUCCESS,
  SELECT_BILLBOARD_FAIL,
  SELECT_BILLBOARD_LOADING,
  SELECT_BILLBOARD_SUCCESS,
} from "../Consts/billboardConsts";

const initialState = {
  errors: null,
  billboards: [],
  homeBillboard: {},
  loading: false,
  selectedBillboard: {},
  uploadLoading: false,
};

export const billboardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_BILLBOARD_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_BILLBOARD_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case CREATE_BILLBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case GET_BILLBOARD_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case GET_BILLBOARD_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_BILLBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        billboards: payload,
      };
    case SELECT_BILLBOARD_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case SELECT_BILLBOARD_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SELECT_BILLBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ADD_IMAGES_TO_BILLBOARD_SUCCESS:
      return {
        ...state,
        uploadLoading: false,
      };
    case ADD_IMAGES_TO_BILLBOARD_LOADING:
      return {
        ...state,
        uploadLoading: true,
      };
    case ADD_IMAGES_TO_BILLBOARD_FAIL:
      return {
        ...state,
        uploadLoading: false,
        errors: payload,
      };
    case GET_HOME_BILLBOARD_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case GET_HOME_BILLBOARD_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_HOME_BILLBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        homeBillboard: payload,
      };
    default:
      return state;
  }
};
