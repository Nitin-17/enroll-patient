import React, { useState } from "react";
import { Modal, Form, Field, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  date: Yup.date().required("Date is required"),
  radio: Yup.string().required("Please select an option"),
  checkbox: Yup.boolean().oneOf([true], "Checkbox must be checked"),
});

const PatientDetails = ({ isOpen, onClose }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    date: "",
    radio: "",
    checkbox: false,
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  const handleClose = () => {
    setModalOpen(false);
    //onClose();
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
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched }) => (
                  <Form>
                    <Field type="text" name="name" placeholder="Name" />
                    <ErrorMessage name="name" />

                    <Field type="email" name="email" placeholder="Email" />
                    <ErrorMessage name="email" />

                    <Field
                      type="text"
                      name="phoneNumber"
                      placeholder="Phone Number"
                    />
                    <ErrorMessage name="phoneNumber" />

                    <Field type="date" name="date" />
                    <ErrorMessage name="date" />

                    <div>
                      <label>
                        <Field type="radio" name="radio" value="option1" />
                        Option 1
                      </label>
                      <label>
                        <Field type="radio" name="radio" value="option2" />
                        Option 2
                      </label>
                    </div>
                    <ErrorMessage name="radio" />

                    <div>
                      <label>
                        <Field type="checkbox" name="checkbox" />
                        Agree to terms and conditions
                      </label>
                    </div>
                    <ErrorMessage name="checkbox" />

                    <button type="submit">Next</button>
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

export default PatientDetails;
