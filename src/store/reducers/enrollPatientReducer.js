import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctorLocationList: [],
};

export const doctorDataSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    addDoctorLocationData: (state, action) => {
      console.log("action", action);
      state.doctorLocationList = action.payload;
    },
  },
});

export const { addDoctorLocationData } = doctorDataSlice.actions;

export default doctorDataSlice.reducer;
