import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import client from "../../helper/axios";

const initialState = {
  doctorLocationList: [],
  icdCodes: {
    icdGroups: [],
    icdCode: [],
  },
  patientEnrollDetails: {
    doctorLocation: [],
    patientDetails: [],
    patientAddress: [],
    patientThresholds: [],
    patientDevice: [],
  },
  suggestedAddress: {},
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
export const fetchIcdCodes = createAsyncThunk(
  "icdCodes/fetchIcdCodes",
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
        "https://vitalsight-common-qa.ohiomron.com/qa/v2/doctor/get-icd-codes",
        { headers }
      );

      if (!response.data.success) {
        throw new Error("Invalid response");
      }

      const s3Response = await client.get(response.data.s3Url);
      const groups = [];
      const codes = [];

      s3Response.data.forEach((icd) => {
        groups.push({
          group: icd.group,
          code: icd.group,
          type: "groups",
        });
        icd.codes.forEach((icdData) => {
          codes.push({
            description: icdData.description,
            group: icd.group,
            code: icdData.id,
            name: icdData.name,
            type: "codes",
          });
        });
      });

      console.log(groups, codes);
      return { groups, codes };
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
);

export const fetchAddress = createAsyncThunk(
  "address/fetchAddress",
  async (params) => {
    console.log("params", params);
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log("accessToken is", accessToken);
      if (!accessToken) {
        console.error("Access token not found in localStorage");
        throw new Error("Access token not found in localStorage");
      }

      const headers = {
        Authorization: localStorage.getItem("accessToken"),
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      console.log("headers", headers);

      const response = await client.post(
        "https://vitalsight-common-qa.ohiomron.com/qa/v2/doctor/verify-address",
        params,
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
    builder.addCase(fetchIcdCodes.fulfilled, (state, action) => {
      console.log("ic codes", action);
      state.icdCodes.icdGroups = action.payload.groups;
      state.icdCodes.icdCode = action.payload.codes;
    });
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      console.log("address", action);
      state.suggestedAddress = action.payload;
    });
  },
  addPatientDetails: (state, action) => {
    state.patientDetails = action.payload;
  },
});

export const { addDoctorLocationData } = doctorDataSlice.actions;

export default doctorDataSlice.reducer;
