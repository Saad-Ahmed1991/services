import { SET_SNACKBAR, REMOVE_ALERT } from "../Consts/snackbarConsts";

const initialState = {
  snackbarOpen: false,
  snackbarType: "success",
  alerts: [],
};

export const snackbarReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SNACKBAR:
      return { ...state, ...payload };

    case REMOVE_ALERT:
      const updatedAlerts = state.alerts.filter(
        (alert) => alert.id !== payload
      );
      return { ...state, alerts: updatedAlerts };

    default:
      return state;
  }
};
