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
  const [selectedCode, setSelectedCode] = useState("");
  console.log("inside nested", name, selectedICDCodes);

  const updateSelectedCodes = () => {
    const isCodeSelected = selectedICDCodes.some(
      (codeItem) => codeItem.code === code
    );

    if (isCodeSelected) {
      setSelectedICDCodes((prevState) =>
        prevState.filter((codeItem) => codeItem.code !== code)
      );
      setSelectedCode("");
    } else {
      setSelectedICDCodes((prevState) => [...prevState, { code, description }]);
      setSelectedCode("active");
    }
  };

  return (
    <>
      <div className="w-64 z-1 h-[40px] left-56 text-left border border-green-500">
        {isOpen && (
          <div className="z-10 w-full bg-white border border-gray-200 rounded-md">
            <input
              type="checkbox"
              id={key}
              checked={selectedICDCodes.some(
                (codeItem) => codeItem.code === code
              )}
              onChange={updateSelectedCodes}
            />
            <label
              htmlFor={code}
              className={
                "text-xs text-ellipsis" +
                (selectedCode === "active" ? "text-blue-600 font-bold" : "")
              }
            >
              {name}
            </label>
          </div>
        )}
      </div>
    </>
  );
};

export default NestedDropdown;
