import axios from "axios";
import {
  DELETE_IMAGE_FAIL,
  DELETE_IMAGE_LOADING,
  DELETE_IMAGE_SUCCESS,
  FOLLOW_FAIL,
  FOLLOW_LOADING,
  FOLLOW_SUCCESS,
  GET_ALBUMS_FAIL,
  GET_ALBUMS_LOADING,
  GET_ALBUMS_SUCCESS,
  GET_ALL_SERVICES_FAIL,
  GET_ALL_SERVICES_LOADING,
  GET_ALL_SERVICES_SUCCESS,
  GET_FOLLOWERS_FAIL,
  GET_FOLLOWERS_LOADING,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWING_FAIL,
  GET_FOLLOWING_LOADING,
  GET_FOLLOWING_SUCCESS,
  GET_ROW_SERVICES_FAIL,
  GET_ROW_SERVICES_LOADING,
  GET_ROW_SERVICES_SUCCESS,
  GET_USER_SERVICE_FAIL,
  GET_USER_SERVICE_LOADING,
  GET_USER_SERVICE_SUCCESS,
  RATE_USER_FAIL,
  RATE_USER_LOADING,
  RATE_USER_SUCCESS,
  SEARCH_VALUES,
  UNFOLLOW_FAIL,
  UNFOLLOW_LOADING,
  UNFOLLOW_SUCCESS,
  UPDATE_PROFESSION_FAIL,
  UPDATE_PROFESSION_LOADING,
  UPDATE_PROFESSION_SUCCESS,
} from "../Consts/serviceConsts";
import { getProfile } from "./profileActions";
import { setSnackbar } from "./snackbarActions";

//create new service

export const createService = (profession, navigate) => async (dispatch) => {
  dispatch({ type: "ADD_SERVICE_LOADING" });
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      "http://localhost:5000/api/service/addservice",
      { profession },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "ADD_SERVICE_SUCCESS", payload: response.data });
    navigate("/profile");
  } catch (error) {
    console.log(error);
    dispatch({ type: "ADD_SERVICE_FAIL", payload: error });
  }
};

export const getCUrrentService = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: "GET_CURRENT_SERVICE_LOADING" });
  try {
    const response = await axios.get(
      "http://localhost:5000/api/service/currentservice",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "GET_CURRENT_SERVICE_SUCCESS", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "GET_CURRENT_SERVICE_FAIL", payload: error });
  }
};

//upload albums

export const uploadImages =
  (images, subfolderName, userId, setOpen) => async (dispatch) => {
    const token = localStorage.getItem("token");
    dispatch({ type: "UPLOAD_MULTIPLE_IMAGES_LOADING" });
    try {
      const response = await axios.put(
        "http://localhost:5000/api/service/uploadimages",
        { subfolderName, images },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: "UPLOAD_MULTIPLE_IMAGES_SUCCESS",
        payload: response.data,
      });
      setOpen(false);
      dispatch(getUserService(userId));
      dispatch(getAlbums(userId));
      dispatch(setSnackbar(true, "success", response.data));
    } catch (error) {
      console.log(error);
      dispatch({ type: "UPLOAD_MULTIPLE_IMAGES_FAIL", payload: error });
      dispatch(setSnackbar(true, "success", error.response.data));
    }
  };

//delete image

export const deleteImage = (imageUrl) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: DELETE_IMAGE_LOADING });
  try {
    const response = await axios.put(
      "http://localhost:5000/api/service/deleteimage",
      { imageUrl },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: DELETE_IMAGE_SUCCESS, payload: response.data });
    dispatch(getCUrrentService(token));
    dispatch(setSnackbar(true, "info", response.data));
  } catch (error) {
    console.log(error);
    dispatch({ type: DELETE_IMAGE_FAIL, payload: error });
    dispatch(setSnackbar(true, "error", error.response.data));
  }
};

//get row services

export const getRowServices = (category) => async (dispatch) => {
  dispatch({ type: GET_ROW_SERVICES_LOADING });
  try {
    if (typeof category == String) {
      const response = await axios.get(
        `http://localhost:5000/api/service/services?category=${category}`
      );
      dispatch({
        type: GET_ROW_SERVICES_SUCCESS,
        payload: { response },
      });
    } else {
      const response = await axios.get(
        `http://localhost:5000/api/service/services?category=${category[0]},${category[1]},${category[2]},${category[3]}`
      );
      dispatch({
        type: GET_ROW_SERVICES_SUCCESS,
        payload: { response },
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_ROW_SERVICES_FAIL, payload: error });
    dispatch(setSnackbar(true, "error", error.response.data));
  }
};
/// get all services

export const getAllService =
  (profession, city, rating, page, limit) => async (dispatch) => {
    dispatch({ type: GET_ALL_SERVICES_LOADING });
    try {
      const response = await axios.get(
        `http://localhost:5000/api/service/search?&page=${page}&limit=${limit}&profession=${profession}&city=${city}&rating=${rating}`
      );
      dispatch({ type: GET_ALL_SERVICES_SUCCESS, payload: response.data });
      console.log(response);
    } catch (error) {
      dispatch({ type: GET_ALL_SERVICES_FAIL, payload: error });
      console.log("error", error);
      dispatch(setSnackbar(true, "error", error.response.data));
    }
  };

//get user serivce

export const getUserService = (userId) => async (dispatch) => {
  dispatch({ type: GET_USER_SERVICE_LOADING });
  try {
    const response = await axios.get(
      `http://localhost:5000/api/service/userservice/${userId}`
    );
    dispatch({
      type: GET_USER_SERVICE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_USER_SERVICE_FAIL, payload: error });
    dispatch(setSnackbar(true, "error", error.response.data));
  }
};

//update profession

export const updateProfession = (profession) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: UPDATE_PROFESSION_LOADING });
  try {
    const response = await axios.put(
      "http://localhost:5000/api/service/updateservice",
      profession,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: UPDATE_PROFESSION_SUCCESS,
      payload: response.data,
    });
    dispatch(getProfile());
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_PROFESSION_FAIL,
      payload: error,
    });
  }
};

// search values

export const searchValues = (profession, city, rating) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCH_VALUES,
      payload: { profession, city, rating },
    });
  } catch (error) {
    console.log(error);
    dispatch(setSnackbar(true, "error", error.response.data));
  }
};

/// follow

export const follow = (userId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: FOLLOW_LOADING });
  try {
    const response = await axios.put(
      `http://localhost:5000/api/service/follow/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: FOLLOW_SUCCESS,
      payload: response.data,
    });
    dispatch(setSnackbar(true, "success", response.data));
    dispatch(getUserService(userId));
  } catch (error) {
    console.log(error);
    dispatch({
      type: FOLLOW_FAIL,
      payload: error,
    });
    dispatch(setSnackbar(true, "error", error.response.data));
  }
};

// unfollow

export const unfollow = (userId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: UNFOLLOW_LOADING });
  try {
    const response = await axios.put(
      `http://localhost:5000/api/service/unfollow/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: UNFOLLOW_SUCCESS,
      payload: response.data,
    });
    dispatch(setSnackbar(true, "success", response.data));

    dispatch(getUserService(userId));
  } catch (error) {
    console.log(error);
    dispatch({
      type: UNFOLLOW_FAIL,
      payload: error,
    });
    dispatch(setSnackbar(true, "error", error.response.data));
  }
};

// rating

export const rateService = (serviceId, rate, userid) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: RATE_USER_LOADING });
  try {
    const response = await axios.put(
      "http://localhost:5000/api/service/rate",
      { serviceId: serviceId, ratingNumber: rate },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(getUserService(userid));
    dispatch(setSnackbar(true, "success", response.data));
    dispatch({ type: RATE_USER_SUCCESS, payload: response });
  } catch (error) {
    console.log(error);
    dispatch({ type: RATE_USER_FAIL, payload: error });
    dispatch(setSnackbar(true, "error", error.response.data));
  }
};

// get followers

export const getFollowers = (serviceId) => async (dispatch) => {
  dispatch({ type: GET_FOLLOWERS_LOADING });
  try {
    const response = await axios.get(
      `http://localhost:5000/api/service/followers/${serviceId}`
    );
    dispatch({ type: GET_FOLLOWERS_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_FOLLOWERS_FAIL, payload: error });
  }
};

//
export const getFollowings = (serviceId) => async (dispatch) => {
  dispatch({ type: GET_FOLLOWING_LOADING });
  try {
    const response = await axios.get(
      `http://localhost:5000/api/service/following/${serviceId}`
    );
    dispatch({ type: GET_FOLLOWING_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_FOLLOWING_FAIL, payload: error });
  }
};

// get albums

export const getAlbums = (userId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: GET_ALBUMS_LOADING });
  try {
    const response = await axios.get(
      `http://localhost:5000/api/service/albums/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: GET_ALBUMS_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_ALBUMS_FAIL, payload: error });
  }
};
