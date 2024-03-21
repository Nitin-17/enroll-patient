import React, { useEffect, useState } from "react";
import { data } from "../data";

const NestedDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="relative inline-block text-left m-20">
        {isOpen && (
          <div
            className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          >
            <div className="py-1" role="none">
              {/* ICd code goes here */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NestedDropdown;
