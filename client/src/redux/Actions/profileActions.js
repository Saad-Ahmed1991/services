import axios from "axios";
import { getUserService } from "./serviceActions";

//create profile

export const createProfile = (profile, navigate) => async (dispatch) => {
  dispatch({ type: "CREATE_PROFILE_LOADING" });
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      "http://localhost:5000/api/profile/createprofile",
      profile,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "CREATE_PROFILE_SUCCESS", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "CREATE_PROFILE_FAIL", payload: error });
  }
};

//create worker profile

export const createWorkerProfile =
  (profile, service, navigate) => async (dispatch) => {
    dispatch({ type: "CREATE_WORKER_PROFILE_LOADING" });
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/profile/createworkerprofile",
        { profile, service },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: "CREATE_WORKER_PROFILE_SUCCESS",
        payload: response.data,
      });
      console.log("response", response);
      navigate(`/profile/${response.data.newProfile.user}`);
    } catch (error) {
      console.log(error);
      dispatch({ type: "CREATE_WORKER_PROFILE_FAIL", payload: error });
    }
  };

//get current profile

export const getProfile = () => async (dispatch) => {
  dispatch({ type: "GET_CURRENT_PROFILE_LOADING" });
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      "http://localhost:5000/api/profile/currentprofile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "GET_CURRENT_PROFILE_SUCCESS", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "GET_CURRENT_PROFILE_FAIL", payload: error });
  }
};

//profile pic upload

export const uploadProfilePicture = (image) => async (dispatch) => {
  dispatch({ type: "UPLOAD_PROFILE_IMAGE_LOADING" });
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(
      "http://localhost:5000/api/profile/uploadprofileimage",
      image,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "UPLOAD_PROFILE_IMAGE_SUCCESS", payload: response.data });
    dispatch(getProfile());
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_PROFILE_IMAGE_FAIL", payload: error });
  }
};

//update profile

export const updateProfile =
  (profile, idProfile, setEdit) => async (dispatch) => {
    dispatch({ type: "UPDATE_PROFILE_LOADING" });
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://localhost:5000/api/profile/editprofile/${idProfile}`,
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "UPDATE_PROFILE_SUCCESS", payload: response.data });
      setEdit(false);
    } catch (error) {
      console.log("error", error);
      dispatch({ type: "UPDATE_PROFILE_FAIL", payload: error });
    }
  };
