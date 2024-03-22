import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleDropdown from "./SimpleDropdown.js";
import { showIcdCodes } from "../../helper/utils.js";
import { addSingleIcdGroupCodes } from "../../store/reducers/enrollPatientReducer.js";

const IcdDropdown = ({ icdArray, icd10Groups, setICDCodes, icdCodes }) => {
  const { icdDropdownData, initialIcdCodes } = useSelector(
    (state) => state?.doctorData
  );
  const dispatch = useDispatch();
  const [mouseHoverActiveGroup, setMouseHoverActiveGroup] = useState("");
  const [searchCodeText, setSearchCodeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [groupLoading, setGroupLoading] = useState(false);
  const [selectedICDCodes, setSelectedICDCodes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [icdData, setIcdData] = useState([]);
  const [icdCodeResultByHover, setIcdCodeResultByHover] = useState([]);

  const toggleDropdown = () => {
    console.log("clicked");
    setIsModalOpen(!isModalOpen);
  };

  const viewNestedDropdown = () => {};

  const viewSimpleDropdown = () => {
    console.log("calledddddddddddddd");
    return (
      icdDropdownData &&
      icdDropdownData.list &&
      icdDropdownData?.list.map((value, i) => (
        <SimpleDropdown
          icdCodeGroupValue={value}
          key={i}
          mouseHoverActiveGroup={mouseHoverActiveGroup}
          setMouseHoverActiveGroup={setMouseHoverActiveGroup}
          selectedICDCodes={selectedICDCodes}
          setSelectedICDCodes={setSelectedICDCodes}
          groupLoading={groupLoading}
          groupItemList={icdDropdownData.groupItemList}
        />
      ))
    );
  };

  const getICDCodesNamesToShow = () => {
    let name = "";
    icdCodes.forEach((ob) => {
      name = `${name}${name ? "; " : ""}${ob.code} ${ob.description}`;
    });
    return name;
  };

  const loadIcdList = useCallback(
    (icdCodeGroup, searchedIcdText) => {
      let params = null;
      if (icdCodeGroup) {
        params = {
          group: icdCodeGroup,
        };
      } else if ((searchedIcdText, searchedIcdText.trim())) {
        params = {
          search: searchedIcdText,
        };
      }
      //console.log("Iniaiiiiiiiiiiiiiiiaaaaaaaaaaaaaaa", initialIcdCodes);
      const result = showIcdCodes(params, dispatch, initialIcdCodes);
      if (result) {
        setIcdCodeResultByHover(result);
        dispatch(addSingleIcdGroupCodes(result));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (mouseHoverActiveGroup) {
      loadIcdList(null, mouseHoverActiveGroup);
    }
  }, [mouseHoverActiveGroup, loadIcdList]);

  //console.log(icdDropdownData, "icdDropdownData--------------");
  //console.log("icdDropwdoan", icdArray, icd10Groups, setICDCodes);
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
          <div className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1" role="none">
              <div>
                <label>
                  <span role="button" tabIndex="0">
                    {icdCodes && icdCodes.length ? (
                      <span className="selected_option_text">
                        {getICDCodesNamesToShow()}
                      </span>
                    ) : (
                      <p>ICD-10 Code</p>
                    )}
                  </span>
                </label>
              </div>
              <div>
                {/* <label>Type code or description</label> */}

                <div className="flex flex-row gap-2">
                  <input
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={searchCodeText}
                    onChange={(e) => {
                      setSearchCodeText(e.target.value);
                      setLoading(false);
                    }}
                    placeholder="Type code or description"
                    type="text"
                  />

                  {searchCodeText.trim() ? (
                    <span
                      className="hover:cursor-pointer"
                      onClick={() => {
                        setSearchCodeText("");
                      }}
                    >
                      X
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className={
                    searchCodeText.trim() ? "overflow-x-scroll h-64" : ""
                  }
                >
                  {/* {searchCodeText.trim() ? (
                    showNestedDropdown()
                  ) : (
                    <>
                      <div>{showSelectedListDropdown()}</div>
                      {showDropdownItem()}
                    </>
                  )} */}
                  <div>{viewSimpleDropdown()}</div>
                </div>
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
