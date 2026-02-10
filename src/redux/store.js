import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import overViewReducer from "./overView";
import schuduleReducer from "./schedule";
import profileManagementrReducer from "./profileMangment";
import doctorReducer from "./doctor";
//import { clearAuthError } from './authSlice'
export const store = configureStore({
  reducer: {
    overView: overViewReducer,
    auth: authSlice,
    schedule: schuduleReducer,
    profile: profileManagementrReducer,
    doctor: doctorReducer,
  },
});
