import axios from "axios";
import { setSnackbar } from "./snackbarActions";
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
  SELECT_BILLBOARD_LOADING,
  SELECT_BILLBOARD_SUCCESS,
} from "../Consts/billboardConsts";

// create billboard

export const createBillboard = (name) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: CREATE_BILLBOARD_LOADING });
  try {
    const response = await axios.post(
      "http://localhost:5000/api/billboard/createbillboard",
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: CREATE_BILLBOARD_SUCCESS, payload: response.data });
    dispatch(setSnackbar(true, "success", response.data));
    dispatch(getBillboard());
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
    dispatch({
      type: GET_BILLBOARD_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: GET_BILLBOARD_FAIL, payload: error });
    dispatch(setSnackbar(true, "error", error.response.data));
  }
};

//select home billboard

export const selectHomeBillboard =
  (selectedBillboardId) => async (dispatch) => {
    dispatch({ type: SELECT_BILLBOARD_LOADING });
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://localhost:5000/api/billboard//selecthomebillboard/${selectedBillboardId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: SELECT_BILLBOARD_SUCCESS, payload: response.data });
      dispatch(setSnackbar(true, "info", response.data));
    } catch (error) {
      dispatch({ type: GET_BILLBOARD_FAIL, payload: error });
      dispatch(setSnackbar(true, "error", error.response.data));
    }
  };

//get Home billboard

export const getHomeBillboard = () => async (dispatch) => {
  dispatch({ type: GET_HOME_BILLBOARD_LOADING });
  try {
    const response = await axios.get(
      "http://localhost:5000/api/billboard/homebillboard"
    );
    dispatch({ type: GET_HOME_BILLBOARD_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_HOME_BILLBOARD_FAIL, payload: error });
    dispatch(setSnackbar(true, "error", error.response.data));
  }
};

// add images to a billboard

export const addImagesToBillboard =
  (billboardId, image) => async (dispatch) => {
    dispatch({ type: ADD_IMAGES_TO_BILLBOARD_LOADING });
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        "http://localhost:5000/api/billboard/addtobillboard",
        { billboardId, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: ADD_IMAGES_TO_BILLBOARD_SUCCESS,
        payload: response.data,
      });
      dispatch(setSnackbar(true, "success", response.data));
    } catch (error) {
      dispatch({ type: ADD_IMAGES_TO_BILLBOARD_FAIL, payload: error });
      dispatch(setSnackbar(true, "error", error.response.data));
    }
  };
