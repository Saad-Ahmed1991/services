import axios from "axios";
import { setSnackbar } from "./snackbarActions";
import {
  CREATE_BILLBOARD_FAIL,
  CREATE_BILLBOARD_LOADING,
  CREATE_BILLBOARD_SUCCESS,
  GET_BILLBOARD_FAIL,
  GET_BILLBOARD_LOADING,
  GET_BILLBOARD_SUCCESS,
} from "../Consts/billboardConsts";

// create billboard

export const createBillboard = (name) => async (dispatch) => {
  dispatch({ type: CREATE_BILLBOARD_LOADING });
  try {
    const response = axios.post(
      "http://localhost:5000/api/billboard/createbillboard",
      name
    );
    dispatch({ type: CREATE_BILLBOARD_SUCCESS, payload: response.data });
    dispatch(setSnackbar(true, "success", response.data));
  } catch (error) {
    dispatch({ type: CREATE_BILLBOARD_FAIL, payload: error });
    dispatch(setSnackbar(true, "error", error.response.data));
  }
};

// get  billboards

export const getBillboard = () => async (dispatch) => {
  dispatch({ type: GET_BILLBOARD_LOADING });
  try {
    const response = await axios.get(
      "http://localhost:5000/api/billboard/allbillboards"
    );
    console.log("response", response);
    dispatch({
      type: GET_BILLBOARD_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: GET_BILLBOARD_FAIL, payload: error });
    dispatch(setSnackbar(true, "error", error.response.data));
  }
};
