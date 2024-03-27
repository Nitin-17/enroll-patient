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
  //console.log("inside nested", name, selectedICDCodes);

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
      <div className="w-64 z-1 h-auto p-2 left-56 text-left hover:bg-slate-100 hover:text-[#0e55aa] hover:cursor-pointer">
        {isOpen && (
          <div className="flex flex-row gap-5 z-10 w-64">
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
                "text-xs font-[650] text-ellipsis " +
                (selectedCode === "active" ? "text-blue-700 font-bold" : "")
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
