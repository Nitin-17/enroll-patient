import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import Select from "react-select";
import "../css/ReactSelect.css";

const Modal = ({ isOpen, onClose }) => {
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
      departmentID: values.department.value || "",
      assignDoctorId: values.physician.value || "",
    };
    console.log("params", params);
  };

  return (
    <>
      {modalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleClose}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="relative bg-white rounded-lg p-8 w-9/12 mx-auto">
              <Formik
                initialValues={initialValues}
                //validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log("called");
                  handleSubmit(values);
                  // setSubmitting(false);
                }}
              >
                {({ errors, touched, isSubmitting, values }) => (
                  <Form>
                    <div className="w-full flex flex-col gap-6">
                      <h1 className="mb-4 flex justify-center text-xl">
                        Enroll Patient(s)
                      </h1>
                      <p>Please provide the information below:</p>
                      <div className="rounded-lg">
                        <Select
                          name="location"
                          value={selectedLocation}
                          onChange={onChangeLocation}
                          placeholder="Select a Location"
                          options={doctorData.map((hospital) => ({
                            label: hospital.name,
                            value: hospital.hospitalID,
                          }))}
                        />
                        {touched.location && errors.location && (
                          <div className="text-red-500">{errors.location}</div>
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
                        />
                        {touched.department && errors.department && (
                          <div className="text-red-500">
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
                        />
                        {touched.physician && errors.physician && (
                          <div className="text-red-500">{errors.physician}</div>
                        )}
                      </div>
                    </div>

                    <div className="modal-footer p-4">
                      <button
                        className="w-32 rounded-full bg-cyan-400 border-2 p-1 text-sm justify-center"
                        onClick={handleClose}
                        type="button"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-fit rounded-full bg-cyan-400 border-2 p-2 text-sm justify-center"
                        //disabled={isSubmitting}
                        //onClick={(values = handleSubmit(values))}
                      >
                        Next:Patient Details
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

export default Modal;
