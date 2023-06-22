// set snackbar

import { REMOVE_ALERT, SET_SNACKBAR } from "../Consts/snackbarConsts";

export const setSnackbar =
  (snackbarOpen, snackbarType = "success", alerts = []) =>
  async (dispatch) => {
    dispatch({
      type: SET_SNACKBAR,
      payload: { snackbarOpen, snackbarType, alerts },
    });
  };

export const removeAlert = (alertId) => {
  return {
    type: REMOVE_ALERT,
    payload: alertId,
  };
};
