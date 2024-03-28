import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import "../css/ReactSelect.css";
import { fetchDoctorData } from "../store/reducers/enrollPatientReducer";
import { sortDataList } from "../helper/utils";

const DoctorLocation = ({ isOpen, onClose, setEnrollStep, enrollStep }) => {
  const { doctorLocationList, selectLocationList } = useSelector(
    (state) => state?.doctorData
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [doctorData, setDoctorData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedPhysician, setSelectedPhysician] = useState("");

  /* Data State for All 3 Dropdowns */
  const [locationList, setLocationList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [physicianList, setPhysicianList] = useState([]);

  /* Show State for All 3 Dropdowns */
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [showDepartmentOptions, setShowDepartmentOptions] = useState(false);
  const [showPhysicianOptions, setShowPhysicianOptions] = useState(false);

  const [hasSelected, setHasSelected] = useState(false);
  const dispatch = useDispatch();
  const modalRef = useRef();

  /* Fetching the doctorLocationList Data that we fetch  and saved via get-hospitalFeatures API call */
  useEffect(() => {
    console.log("SelectLocationData", selectLocationList, doctorData);

    /* Checking whether showLocation is true based on data received */
    let showLocation = selectLocationList?.locationList?.length > 0;
    setShowLocationOptions(showLocation);

    if (selectLocationList && selectLocationList?.locationList?.length > 1) {
      let location = selectLocationList.locationList.map((loc) => {
        return { value: loc.key, label: loc.name };
      });
      setLocationList(location);
      /*  if (doctorLocationList.selectedLocation) {
        const index = location.findIndex((loc) => loc.value === doctorLocationList.selectedLocation);
        if (index >= 0) {
            setLocationList(location[`${index}`]);
        }
    } */
    }

    /* Checking whether showDepartment is true based on data received */
    let showDepartment = selectLocationList?.departmentList?.length > 0;
    setShowDepartmentOptions(showDepartment);

    if (selectLocationList && selectLocationList?.departmentList?.length > 1) {
      let department = selectLocationList.departmentList.map((loc) => {
        return { value: loc.key, label: loc.name };
      });
      setDepartmentList(department);
    }
  }, [selectLocationList]);

  /* Filtering the physician list */
  const filterDoctorList = (doctorDataList) => {
    return doctorDataList
      .filter(
        (item) =>
          selectedLocation &&
          selectedDepartment &&
          item.facilityLocationIds.includes(selectedLocation) &&
          item.departmentIds.includes(selectedDepartment)
      )
      .map((user) => ({
        label: user.name || user.emailAddress,
        value: user.userID,
      }));
  };

  /* Setting up the physician dropdown options */
  useEffect(() => {
    if (doctorData && doctorData.length > 0) {
      if (
        selectLocationList?.locationList &&
        selectLocationList?.departmentList.length === 1 &&
        selectLocationList?.locationList.length === 1
      ) {
        const FilteredDoctorData = filterDoctorList(doctorData);
        if (FilteredDoctorData.length === 1) {
          selectedPhysician(FilteredDoctorData[0]);
        }
        physicianList(FilteredDoctorData);
      }
    }
  }, [doctorData]);

  const validationSchema = Yup.object().shape({
    location: Yup.string().required("Location is required"),
    department: Yup.string().required("Department is required"),
    physician: Yup.string().required("Physician is required"),
  });

  const initialValues = {
    location: "",
    department: "",
    physician: "",
  };

  useEffect(() => {
    if (doctorLocationList && doctorLocationList?.data?.length > 0) {
      setModalOpen(true);
      setDoctorData(doctorLocationList?.data);
    }
  }, [doctorLocationList]);

  const handleClose = () => {
    setModalOpen(false);
  };

  const onChangeLocation = (values) => {
    /*  setSelectedLocation(selectedOption);
    setSelectedDepartment("");
    setSelectedPhysician("");
    setHasSelected(true);
    //setShowPhysicianList(false); */
    console.log("valuesssss", values);
    setSelectedLocation(values);
    setPhysicianList("");
    if (doctorData && doctorData.length > 0) {
      const dataOnLocationChange = doctorData
        .filter(
          (item) =>
            item.facilityLocationIds.includes(values.value) &&
            selectedDepartment &&
            item.departmentIds.includes(selectedDepartment)
        )
        .map((user) => {
          return {
            label: user.name || user.emailAddress,
            value: user.userID,
          };
        });
      console.log("dataOnLocationChange");
      if (dataOnLocationChange.length === 1) {
        setSelectedPhysician(dataOnLocationChange[0]);
      }
      setPhysicianList(dataOnLocationChange);
    }
  };

  const onChangeDepartment = (values) => {
    /*  setSelectedDepartment(selectedOption);
    setSelectedPhysician("");
    //setShowPhysicianList(false); */
    console.log("valuesssss", values);
    setSelectedDepartment(values);
    setPhysicianList("");
    if (doctorData && doctorData.length > 0) {
      const dataOnDepartmentChange = doctorData
        .filter(
          (item) =>
            item.facilityLocationIds.includes(values.value) &&
            selectedDepartment &&
            item.departmentIds.includes(selectedDepartment)
        )
        .map((user) => {
          return {
            label: user.name || user.emailAddress,
            value: user.userID,
          };
        });
      /*     if (dataOnDepartmentChange.length === 1) {
        setSelectedPhysician(dataOnDepartmentChange[0]);
      } */
      setPhysicianList(dataOnDepartmentChange);
    }
  };

  const onChangePhysician = (selectedOption) => {
    setSelectedPhysician(selectedOption);
  };

  const handleSubmit = (values) => {
    console.log("valuessss", values);
    const params = {
      facilityLocationID: selectedLocation || "",
      departmentID: values.department || "",
      assignDoctorId: values.physician || "",
    };
    //console.log("params", params);
    dispatch(fetchDoctorData(values));

    setEnrollStep(1);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const optionStyle = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderRadius: "15px",
      fontSize: "14px",
      //borderColor: hasSelected ? "red" : "black",
      "&:hover": {
        borderColor: "black",
      },
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        display: "flex",
        flexDirection: "col",
        gap: "1rem",
        padding: "2px",
        margin: "2px",
        width: "full",
        cursor: isDisabled ? "not-allowed" : "default",
        "&:hover": {
          border: "2px solid black",
          borderRadius: "5px",
          position: "relative",
        },
      };
    },
  };

  return (
    <>
      {modalOpen && enrollStep === 0 && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-black opacity-75"></div>
            </div>
            <div className="relative bg-white rounded-lg p-6">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                /* onSubmit={(values) => {
                  console.log("called", values);
                  handleSubmit(values);
                  // setSubmitting(false);
                }} */
              >
                {({ errors, touched, isSubmitting, values }) => (
                  <Form className="bg-[#f6f9fd] p-2 rounded-lg">
                    <div className="w-full flex flex-col gap-6 p-6">
                      <div className="flex flex-col gap-1">
                        <h1 className="mb-4 flex justify-center text-xl font-medium">
                          Enroll Patient(s)
                        </h1>
                        <p className="font-medium text-sm">
                          Please provide the information below:
                        </p>
                      </div>
                      <div className="rounded-lg">
                        <Select
                          name="location"
                          className="text-sm"
                          options={
                            locationList.length > 0 &&
                            sortDataList(locationList, "label")
                          }
                          onChange={(values) => onChangeLocation(values)}
                          value={
                            (values.location =
                              selectedLocation || values.location)
                          }
                          placeholder="Select a Location"
                          styles={optionStyle}
                        />
                        {touched.location && errors.location && (
                          <div className="text-red-500 text-xs font-medium text-center">
                            {errors.location}
                          </div>
                        )}
                      </div>
                      <div className="rounded-lg">
                        <Select
                          name="department"
                          value={
                            (values.department =
                              selectedDepartment || values.department)
                          }
                          onChange={(values) => onChangeDepartment(values)}
                          placeholder="Select a Department"
                          options={
                            departmentList.length > 0 &&
                            sortDataList(departmentList, "label")
                          }
                          styles={optionStyle}
                        />
                        {touched.department && errors.department && (
                          <div className="text-red-500 text-xs font-medium text-center">
                            {errors.department}
                          </div>
                        )}
                      </div>
                      <div className="rounded-lg">
                        <Select
                          name="physician"
                          options={sortDataList(physicianList, "label")}
                          value={(values.doctor = selectedPhysician)}
                          onChange={(values) => onChangePhysician(values)}
                          placeholder="Select a Physician"
                          styles={optionStyle}
                        />
                        {touched.physician && errors.physician && (
                          <div className="text-red-500 text-xs font-medium text-center">
                            {errors.physician}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="modal-footer p-4 flex flex-row justify-between">
                      <button
                        className="w-72 rounded-lg bg-[#61636B] hover:bg-[#343a40] border-2 pt-2.5 pb-2.5 text-sm justify-center text-white font-[450]"
                        onClick={handleClose}
                        type="button"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-72 rounded-lg bg-[#0e55aa] hover:bg-[#05346c] border-2 pt-2.5 pb-2.5 text-sm justify-center text-white font-[450]"
                        //disabled={isSubmitting}
                        onClick={(values) => handleSubmit(values)}
                      >
                        Next : Patient Details
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorLocation;
