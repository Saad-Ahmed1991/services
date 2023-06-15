import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { profileReducer } from "./profileReducer";
import { serviceReducer } from "./serviceReducer";

export const rootReducer = combineReducers({
  userReducer,
  profileReducer,
  serviceReducer,
});
