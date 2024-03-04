/* import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa'; */
/* import { FcWikipedia } from 'react-icons/fc';
import { NavLink } from 'react-router-dom'; */
import { useNavigate } from "react-router";

const Dashboard = () => {
  //const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  /*     const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    }; */

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  console.log("called");

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      {/*             <aside className={`w-64 bg-gray-800 text-white p-4 ${isSidebarOpen ? 'block' : 'hidden'}`}>
                <div className="mb-4 text-center ml-2">
                    <FcWikipedia size={50} />
                </div>
                <ul className="flex flex-col gap-2">
                    <li className="cursor-pointer hover:bg-gray-700 p-2 rounded border-b-2">Dashboard</li>
                    <li className="cursor-pointer hover:bg-gray-700 p-2 rounded border-b-2">Settings</li>
                </ul>
            </aside> */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <nav className="flex flex-row justify-between w-full h-12 items-center p-2">
          {/*                     <button onClick={toggleSidebar} className="p-2 text-white">
                        <FaBars size={30} />
                    </button> */}
          {/* <button className="p-1 bg-slate-600 rounded-md text-white" onClick={logOut}>
                        Logout
                    </button> */}
        </nav>

        {/* Main Content Area */}
        <main className="flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto p-4 m-auto border-2 rounded-lg w-fit">
          <div className="py-20">
            <div className="mx-auto px-6 flex flex-col items-center justify-center gap-4">
              <h2 className="text-4xl font-semibold mb-2 text-black">
                Welcome to Home Page
              </h2>

              <button
                className="bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider"
                onClick={logOut}
              >
                Logout
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
