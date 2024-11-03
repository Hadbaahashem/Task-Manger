import React, { useState } from "react";
import SideBar from "../components/Home/SideBar";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative  flex h-[98vh] gap-4">
      <button
        className="lg:hidden fixed z-20 top-4 left-4 text-3xl text-white "
        onClick={toggleSidebar}
      >
        <FaBars className="" />
      </button>

      <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="w-full lg:w-5/6 ml-auto  p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
