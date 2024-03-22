import React, { useEffect, useState } from "react";

const NestedDropdown = ({
  name,
  key,
  code,
  description,
  selectedICDCodes,
  setSelectedICDCodes,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  console.log("inside nested", name, code);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="relative z-1 left-24 text-left h-64  ">
        {isOpen && (
          <div className="absolute left-36 z-10 w-64 overflow-y origin-top-right rounded-md bg-white">
            <div className="left-16">
              <label htmlFor={code}>{name}</label>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NestedDropdown;
