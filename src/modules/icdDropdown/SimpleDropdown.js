import React, { useEffect, useState } from "react";

const SimpleDropdown = ({
  value,
  key,
  selectedICDCodes,
  setSelectedICDCodes,
  groupLoading,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [icdData, setIcdData] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  console.log("+++++++++++++++++++++++++++++++", value);

  return (
    <>
      <div className="relative inline-block text-left m-20">
        {true && (
          <div
            className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          >
            <div className="py-1" role="none">
              {/* Loop through ICD List Here */}
              {value}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SimpleDropdown;
