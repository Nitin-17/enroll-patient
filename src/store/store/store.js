// store.js
import { configureStore } from "@reduxjs/toolkit";
import doctorDataReducer from "../reducers/enrollPatientReducer"; // Correct the path to your reducer file

export const store = configureStore({
  reducer: {
    doctorData: doctorDataReducer,
    // other reducers...
  },
});
