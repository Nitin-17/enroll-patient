import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleDropdown from "./SimpleDropdown.js";
import NestedDropdown from "./NestedDropdown.js";
import { showIcdCodes, debounce } from "../../helper/utils.js";
import { addSingleIcdGroupCodes } from "../../store/reducers/enrollPatientReducer.js";

const IcdDropdown = ({ icdArray, icd10Groups, setICDCodes, icdCodes }) => {
  const { icdDropdownData, initialIcdCodes, icdCodesBySingleGroup } =
    useSelector((state) => state?.doctorData);
  const { patientEnrollDetails } = useSelector((state) => state?.doctorData);
  const dispatch = useDispatch();
  const [mouseHoverActiveGroup, setMouseHoverActiveGroup] = useState("");
  const [searchCodeText, setSearchCodeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [groupLoading, setGroupLoading] = useState(false);
  const [selectedICDCodes, setSelectedICDCodes] = useState(
    patientEnrollDetails?.patientDetails?.icdCodes || []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [icdData, setIcdData] = useState([]);
  const [icdCodeResultByHover, setIcdCodeResultByHover] = useState([]);

  const toggleDropdown = () => {
    console.log("clicked");
    setIsModalOpen(!isModalOpen);
  };

  const viewSelectedIcdListDropdown = () => {
    if (icdCodes && icdCodes.length > 0) {
      return icdCodes.map((selectedItem) => (
        <NestedDropdown
          name={`${selectedItem.code} - ${selectedItem.description}`}
          key={selectedItem.code}
          code={selectedItem.code}
          description={selectedItem.description}
          selectedICDCodes={selectedICDCodes}
          setSelectedICDCodes={setSelectedICDCodes}
        />
      ));
    }
  };

  const viewNestedDropdownForSearch = () => {
    if (
      icdCodesBySingleGroup &&
      icdCodesBySingleGroup?.length > 0 &&
      searchCodeText
    ) {
      return icdCodesBySingleGroup.map((selectedItem) => (
        <NestedDropdown
          name={`${selectedItem.name} - ${selectedItem.description}`}
          key={selectedItem.code}
          code={selectedItem.name}
          description={selectedItem.description}
          selectedICDCodes={selectedICDCodes}
          setSelectedICDCodes={setSelectedICDCodes}
        />
      ));
    }
  };

  const viewSimpleDropdown = () => {
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
    (searchedIcdText = null, icdCodeGroup = null) => {
      let params = null;
      if (icdCodeGroup && !searchCodeText) {
        params = {
          group: icdCodeGroup,
        };
      } else if (searchedIcdText && searchedIcdText.trim()) {
        params = {
          search: searchedIcdText,
        };
      }
      console.log("params", params);
      const result = showIcdCodes(params, dispatch, initialIcdCodes);
      if (result) {
        setIcdCodeResultByHover(result);
        dispatch(addSingleIcdGroupCodes(result));
      }
    },
    [dispatch, initialIcdCodes]
  );

  useEffect(() => {
    if (mouseHoverActiveGroup) {
      loadIcdList(null, mouseHoverActiveGroup);
    }
  }, [mouseHoverActiveGroup, loadIcdList]);

  const debouncedIcdSearch = useCallback(
    (inputIcdText) => {
      debounce(loadIcdList(inputIcdText), 400);
    },
    [loadIcdList]
  );

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
                {/* <label>Type code or description</label> */}

                <div className="flex flex-row gap-2">
                  <input
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={searchCodeText}
                    onChange={(e) => {
                      setSearchCodeText(e.target.value);
                      debouncedIcdSearch(e.target.value);
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
                        debouncedIcdSearch("");
                      }}
                    >
                      X
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                {/* <div>
                  <label>
                    <span role="button" tabIndex="0">
                      {icdCodes && icdCodes.length ? (
                        <span className="text-xs font-normal">
                          {getICDCodesNamesToShow()}
                        </span>
                      ) : (
                        <p>No Code Found</p>
                      )}
                    </span>
                  </label>
                </div> */}

                <div
                  className={
                    searchCodeText.trim() ? "overflow-x-scroll h-64" : ""
                  }
                >
                  {searchCodeText && searchCodeText.trim() ? (
                    viewNestedDropdownForSearch()
                  ) : (
                    <>
                      <div>{viewSelectedIcdListDropdown()}</div>
                      {viewSimpleDropdown()}
                    </>
                  )}

                  <div className="p-4 flex z-999999 flex-row justify-start gap-4 w-64 border-red-500 border">
                    <button
                      className="w-16 rounded-lg bg-[#61636B] hover:bg-[#343a40] border-2 pt-2.5 pb-2.5 text-sm justify-center text-white font-[450]"
                      onClick={() => setIsModalOpen(false)}
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="w-16 hover:cursor-pointer rounded-lg bg-[#0e55aa] hover:bg-[#05346c] border-2 pt-2.5 pb-2.5 text-sm justify-center text-white font-[450]"
                      onClick={() => {
                        console.log("+++++++++++++=");
                        setICDCodes(selectedICDCodes);
                        setIsModalOpen(false);
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default IcdDropdown;
