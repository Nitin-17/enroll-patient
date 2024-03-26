import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NestedDropdown from "./NestedDropdown";

const SimpleDropdown = ({
  icdCodeGroupValue,
  key,
  selectedICDCodes,
  setSelectedICDCodes,
  groupLoading,
  mouseHoverActiveGroup,
  setMouseHoverActiveGroup,
}) => {
  const { icdDropdownData, icdCodesBySingleGroup } = useSelector(
    (state) => state?.doctorData
  );
  const [isOpen, setIsOpen] = useState(false);
  const [icdData, setIcdData] = useState([]);

  /*   const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }; */

  const viewNestedDropdown = () => {
    if (icdCodesBySingleGroup && icdCodesBySingleGroup.length > 0) {
      return icdCodesBySingleGroup[0].map((item) => (
        <NestedDropdown
          name={`${item.id} - ${item.description}`}
          key={item.id}
          code={item.name}
          description={item.description}
          selectedICDCodes={selectedICDCodes}
          setSelectedICDCodes={setSelectedICDCodes}
        />
      ));
    }
  };

  //  console.log("+++++++++++++++++++++++++++++++", icdCodeGroupValue);

  return (
    <>
      <div className=" flex flex-col text-left h-8">
        {true && (
          <div className="absolute left-0 z-10 w-56 h-8 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="flex flex-col h-[10vh]">
              <button
                onMouseEnter={() => setMouseHoverActiveGroup(icdCodeGroupValue)}
                className="h-8"
              >
                {icdCodeGroupValue}
              </button>

              {mouseHoverActiveGroup === icdCodeGroupValue && (
                <div className="overflow-y-scroll relative z-20 left-56 w-72 h-32 bg-white shadow-lg border border-gray-200">
                  {viewNestedDropdown()}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SimpleDropdown;
