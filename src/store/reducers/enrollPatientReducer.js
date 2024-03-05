import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import client from "../../helper/axios";

const initialState = {
  doctorLocationList: [],
};

export const fetchDoctorData = createAsyncThunk(
  "doctorData/fetchDoctorData",
  async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log("accessToken is", accessToken);
      if (!accessToken) {
        console.error("Access token not found in localStorage");
        throw new Error("Access token not found in localStorage");
      }

      const headers = {
        Authorization: `${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      const response = await client.get(
        "https://vitalsight-common-qa.ohiomron.com/qa/v2/doctor/doctor-location-list",
        { headers }
      );

      if (response && response.data && response.data.success) {
        console.log("called", response.data);
        return response.data;
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
);

const doctorDataSlice = createSlice({
  name: "doctorData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDoctorData.fulfilled, (state, action) => {
      console.log("extra reducer");
      state.doctorLocationList = action.payload;
    });
  },
});

export const { addDoctorLocationData } = doctorDataSlice.actions;

export default doctorDataSlice.reducer;
