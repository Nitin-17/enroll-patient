import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import "../css/ReactSelect.css";
import { fetchDoctorData } from "../store/reducers/enrollPatientReducer";

const DoctorLocation = ({ isOpen, onClose, setEnrollStep, enrollStep }) => {
  const { doctorLocationList, error } = useSelector(
    (state) => state?.doctorData
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [doctorData, setDoctorData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedPhysician, setSelectedPhysician] = useState("");
  const [showPhysicianList, setShowPhysicianList] = useState(false);

  const [hasSelected, setHasSelected] = useState(false);
  const dispatch = useDispatch();
  const modalRef = useRef();

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
    //onClose();
  };

  const handleNextPage = async (validateForm) => {
    console.log("validate");
    //const errors = await validateForm();
    /*    if (!Object.keys(errors).length) {
      setCurrentPage(currentPage + 1);
    } */
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const onChangeLocation = (selectedOption) => {
    setSelectedLocation(selectedOption);
    setSelectedDepartment("");
    setSelectedPhysician("");
    setHasSelected(true);
    //setShowPhysicianList(false);
  };

  const onChangeDepartment = (selectedOption) => {
    setSelectedDepartment(selectedOption);
    setSelectedPhysician("");
    //setShowPhysicianList(false);
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
                          aria-label="select location"
                          name="location"
                          classNamePrefix="react-select"
                          value={selectedLocation}
                          onChange={onChangeLocation}
                          placeholder="Select a Location"
                          options={doctorData.map((hospital) => ({
                            label: hospital.name,
                            value: hospital.hospitalID,
                          }))}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: "15px",
                              borderColor: hasSelected ? "red" : "black",
                              "&:hover": {
                                borderColor: "black",
                              },
                            }),
                          }}
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
                          value={selectedDepartment}
                          onChange={onChangeDepartment}
                          placeholder="Select a Department"
                          options={doctorData.map((hospital) => ({
                            label: hospital.name,
                            value: hospital.hospitalID,
                          }))}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: "15px",
                              "&:hover": {
                                borderColor: "black",
                              },
                            }),
                          }}
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
                          value={selectedPhysician}
                          onChange={onChangePhysician}
                          placeholder="Select a Physician"
                          options={
                            selectedDepartment &&
                            selectedLocation &&
                            Array.isArray(doctorData)
                              ? doctorData.map((hospital) => ({
                                  label: hospital.name,
                                  value: hospital.hospitalID,
                                }))
                              : []
                          }
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderRadius: "15px",
                              "&:hover": {
                                borderColor: "black",
                              },
                            }),
                          }}
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
