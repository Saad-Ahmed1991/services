import {
  CREATE_BILLBOARD_FAIL,
  CREATE_BILLBOARD_LOADING,
  CREATE_BILLBOARD_SUCCESS,
  GET_BILLBOARD_FAIL,
  GET_BILLBOARD_LOADING,
  GET_BILLBOARD_SUCCESS,
} from "../Consts/billboardConsts";

const initialState = {
  errors: null,
  billboards: [],
  currentBillboard: [],
  loading: false,
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
    default:
      return state;
  }
};
