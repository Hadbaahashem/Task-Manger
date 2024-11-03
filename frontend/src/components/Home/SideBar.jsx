import React, { useEffect, useState } from "react";
import { GrNotes } from "react-icons/gr";
import { MdIncompleteCircle } from "react-icons/md";
import { IoCheckmarkOutline } from "react-icons/io5";
import { MdNotificationImportant } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const SideBar = ({ isSidebarOpen, toggleSidebar }) => {
  const [Data, setData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found, please log in.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/v2/get-all-tasks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const data = [
    {
      title: "All Tasks",
      icon: <GrNotes />,
      link: "/",
    },
    {
      title: "Completed Tasks",
      icon: <IoCheckmarkOutline />,
      link: "/completed",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");

    dispatch(authActions.logout());

    navigate("/login");
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed z-10 top-0 left-0 w-64 h-full bg-gray-800 text-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-1/6 p-4 flex flex-col justify-between`}
    >
      <div>
        {Data ? (
          <>
            <h2 className="text-xl font-semibold pt-10">{Data.username}</h2>
            <h4 className="mb-1 text-gray-400">{Data.email}</h4>
          </>
        ) : (
          <p className="text-gray-400">Loading user info...</p>
        )}
        <hr className="border-gray-600" />
      </div>

      <div className="flex flex-col gap-2 mt-6">
        {data.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-700 transition-all duration-300"
            onClick={toggleSidebar}
          >
            {items.icon}
            <span>{items.title}</span>
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <button
          className="bg-gray-600 w-full p-2 rounded text-white hover:bg-red-700"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
