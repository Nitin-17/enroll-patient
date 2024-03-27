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
  const [isLoading, setIsLoading] = useState(false);

  const [icdData, setIcdData] = useState([]);

  console.log("_++++++++__________", icdDropdownData);

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
      <div className=" flex flex-col text-left h-8 ">
        {true && (
          <div
            onMouseEnter={() => {
              setMouseHoverActiveGroup(icdCodeGroupValue);
              setIsLoading(true);
            }}
            onMouseLeave={() => {
              setMouseHoverActiveGroup("");
              setIsLoading(true);
            }}
            className="absolute left-0 z-10 w-72 h-8 origin-top-right bg-white hover:bg-slate-100 hover:cursor-pointer ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="py-1 relative inline-block w-64 h-8 mb-2">
              <div className="flex flex-row justify-between items-center hover:text-[#0e55aa]">
                <button className="h-8 text-[12px] font-bold pl-6 text-justify">
                  {icdCodeGroupValue}
                </button>
                <div className="mb-3 ">
                  {/*  <svg
                    className={`-mr-1 h-5 w-5 text-black-700 font-bold transform transition-transform -rotate-90 `}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg> */}
                  <svg
                    className={`-mr-3 h-5 w-5 text-black font-bold transform transition-transform -rotate-90 `}
                    xmlns="http://www.w3.org/2000/svg"
                    width="10.033"
                    height="5"
                  >
                    <path d="M5.016 0 0 .003 2.506 2.5 5.016 5l2.509-2.5L10.033.003 5.016 0z" />
                  </svg>
                </div>
              </div>

              {mouseHoverActiveGroup === icdCodeGroupValue && isLoading && (
                <div className="overflow-y-scroll bottom-9 relative z-20  left-72 w-72 h-32 bg-white shadow-lg border border-gray-200">
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
