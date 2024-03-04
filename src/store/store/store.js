import { configureStore } from "@reduxjs/toolkit";
import { doctorDataSlice } from "../reducers/enrollPatientReducer";

export const store = configureStore({
  reducer: doctorDataSlice.reducer,
});
