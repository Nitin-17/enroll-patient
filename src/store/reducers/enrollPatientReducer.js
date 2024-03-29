import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import client from "../../helper/axios";

const initialState = {
  doctorLocationList: [],
  selectLocationList: {
    locationList: [],
    departmentList: [],
    physicianList: [],
  },
  icdCodes: {
    icdGroups: [],
    icdCode: [],
  },
  initialIcdCodes: [],
  icdCodesBySingleGroup: [],
  icdCodesByTextSearch: [],
  patientEnrollDetails: {
    doctorLocation: [],
    patientDetails: {},
    patientAddress: {},
    patientThresholds: {},
    patientDevice: [],
  },
  suggestedAddress: {},
  hospitalFeatures: {},
  icdDropdownData: {
    list: [],
    isLoaded: false,
    isGroupLoaded: false,
    searchList: [],
    searchText: null,
    groupItemList: [],
    groupItem: null,
    oldSearchData: [],
  },
};

export const fetchDoctorData = createAsyncThunk(
  "doctorData/fetchDoctorData",
  async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
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
        return response.data;
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      //return error;
      throw error;
    }
  }
);
export const fetchIcdCodes = createAsyncThunk(
  "icdCodes/fetchIcdCodes",
  async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
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
      const groupList = [];
      const initialIcdData = [];

      initialIcdData.push(s3Response.data);
      s3Response.data.forEach((icd) => {
        groups.push({
          group: icd.group,
          code: icd.group,
          type: "groups",
        });
        groupList.push(icd.group);
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

      return { groups, codes, groupList, initialIcdData };
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
);

/* export const fetchAddress = createAsyncThunk(
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
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      //throw error;
      return error;
    }
  }
); */

export const getHospitalFeatures = createAsyncThunk(
  "hospitalFeatures/getHospitalFeatures",
  async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      //console.log("accessToken is", accessToken);
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

      const response = await client.get(
        "https://vitalsight-common-qa.ohiomron.com/qa/v2/doctor/get-hospital-features",
        { headers }
      );

      if (response && response.data && response.data.status) {
        console.log("called hospital feature", response?.data?.data);
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      //throw error;
      return error;
    }
  }
);

const doctorDataSlice = createSlice({
  name: "doctorData",
  initialState,
  reducers: {
    addPatientDetails: (state, action) => {
      state.patientEnrollDetails.patientDetails = action.payload;
      console.log(
        "state.patientEnrollDetails.patientDetails",
        state.patientEnrollDetails.patientDetails
      );
    },
    addSingleIcdGroupCodes: (state, action) => {
      state.icdCodesBySingleGroup = action.payload;
      console.log("state.initialIcdCodes", state.icdCodesBySingleGroup);
    },
    addIcdSearchCodes: (state, action) => {
      state.icdCodesByTextSearch = action.payload;
      console.log("state.initialIcdCodes", state.icdCodesByTextSearch);
    },
    addPatientAddress: (state, action) => {
      state.patientEnrollDetails.patientAddress = action.payload;
      console.log(
        "state.patientEnrollDetails.patientAddress",
        state.patientEnrollDetails.patientAddress
      );
    },
    addPatientDevice: (state, action) => {
      state.patientEnrollDetails.patientDevice = action.payload;
      console.log(
        "state.patientEnrollDetails.patientDevice",
        state.patientEnrollDetails.patientDevice
      );
    },
    addPatientThresholds: (state, action) => {
      state.patientEnrollDetails.patientThresholds = action.payload;
      console.log(
        "state.patientEnrollDetails.patientThresholds",
        state.patientEnrollDetails.patientThresholds
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDoctorData.fulfilled, (state, action) => {
      state.doctorLocationList = action.payload;
      //console.log("doctorLocationData", state.doctorLocationList);
    });
    builder.addCase(fetchIcdCodes.fulfilled, (state, action) => {
      state.icdCodes.icdGroups = action.payload.groups;
      state.icdCodes.icdCode = action.payload.codes;
      state.icdDropdownData.list = action.payload.groupList;
      state.icdDropdownData.isLoaded = true;
      state.initialIcdCodes = action.payload.initialIcdData;
    });
    /*   builder.addCase(fetchAddress.fulfilled, (state, action) => {
      console.log("address", action);
      state.suggestedAddress = action.payload;
    }); */
    builder.addCase(getHospitalFeatures.fulfilled, (state, action) => {
      state.hospitalFeatures = action.payload;
      state.selectLocationList.departmentList =
        action.payload?.data?.departments;
      state.selectLocationList.locationList =
        action.payload?.data?.facilityLocation;
    });
  },
});

export const { addDoctorLocationData } = doctorDataSlice.actions;
export const {
  addPatientDetails,
  addPatientAddress,
  addPatientThresholds,
  addPatientDevice,
  initialIcdCodes,
  addIcdSearchCodes,
  addSingleIcdGroupCodes,
} = doctorDataSlice.actions;

export default doctorDataSlice.reducer;
