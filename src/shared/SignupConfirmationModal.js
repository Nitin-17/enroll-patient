import React from "react";
import { FcCheckmark } from "react-icons/fc";
import { ImCross } from "react-icons/im";
import { useSelector } from "react-redux";

const SignupConfirmationModal = ({ isOpen, onClose, title, content }) => {
  const { doctorLocationList, error } = useSelector(
    (state) => state?.doctorData
  );

  return (
    <>
      {doctorLocationList.length > 0 && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-12 rounded-lg w-96 flex flex-col gap-2 items-center justify-center">
            <div className="flex justify-between items-center mb-2">
              {/* <h1 className="text-lg text-center font-bold">{title}</h1> */}
              {title === "Successfull" ? (
                <span className="border-2 p-1 rounded-md border-green-400 ">
                  <FcCheckmark size={32} color="green" />
                </span>
              ) : (
                <span className="border-2 p-2 rounded-md border-red-400 ">
                  <ImCross size={32} color="red" />
                </span>
              )}
            </div>
            <div className="mb-4 text-black-200">{content}</div>
            <button
              className="text-gray-100 p-2 rounded-md border-2 bg-blue-400 w-16"
              onClick={onClose}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SignupConfirmationModal;
