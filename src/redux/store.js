import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import overViewReducer from "./overViews/overView";
import schuduleReducer from "./schedule/schedule";
import profileManagementrReducer from "./doctor/profileMangment";
import doctorReducer from "./doctor/doctor";
import patientsListReducer from "./patientList/patientList";
//import { clearAuthError } from './authSlice'
export const store = configureStore({
  reducer: {
    overView: overViewReducer,
    auth: authSlice,
    schedule: schuduleReducer,
    profile: profileManagementrReducer,
    doctor: doctorReducer,
    patients: patientsListReducer,
  },
});
