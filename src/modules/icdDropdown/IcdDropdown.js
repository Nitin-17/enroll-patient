import React, { useState } from "react";
import { useSelector } from "react-redux";
//import SimpleDropdown from "./SimpleDropdown";

const IcdDropdown = ({ icdArray, icd10Groups, setICDCodes, icdCodes }) => {
  const { icdDropdownData } = useSelector((state) => state?.doctorData);
  const [active, setActive] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [groupLoading, setGroupLoading] = useState(false);
  const [selectedICDCodes, setSelectedICDCodes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [icdData, setIcdData] = useState([]);

  const toggleDropdown = () => {
    console.log("clicked");
    setIsModalOpen(!isModalOpen);
  };

  const getICDCodesNames = () => {
    let name = "";
    icdCodes.forEach((ob) => {
      name = `${name}${name ? "; " : ""}${ob.code} ${ob.description}`;
    });
    return name;
  };

  console.log(icdDropdownData, "icdDropdownData--------------");
  console.log("icdDropwdoan", icdArray, icd10Groups, setICDCodes);
  return (
    <>
      <div className="relative inline-block text-left m-20">
        <div>
          <button
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            id="menu-button"
            onClick={() => {
              if (!loading) {
                toggleDropdown();
              }
            }}
          >
            ICD-10 Code
            <svg
              className={`-mr-1 h-5 w-5 text-gray-400 transform transition-transform ${
                isModalOpen ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {isModalOpen && (
          <div
            className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          >
            <div className="py-1" role="none">
              <div>
                <label>
                  <span role="button" tabIndex="0">
                    {icdCodes && icdCodes.length ? (
                      <span className="selected_option_text">
                        {getICDCodesNames()}
                      </span>
                    ) : (
                      <p>ICD-10 Code</p>
                    )}

                    <span className="arrow_botttom">
                      <i
                        className={`fas ${
                          isModalOpen ? "fa-caret-up" : "fa-caret-down"
                        }`}
                      />
                    </span>
                  </span>
                </label>
              </div>
              {/*      <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-1"
              >
                Support
              </a>
              <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-2"
              > 
                License
              </a>
              */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default IcdDropdown;
