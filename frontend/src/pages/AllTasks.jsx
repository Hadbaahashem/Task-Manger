import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import { IoMdAdd } from "react-icons/io";
import InputData from "../components/Home/InputData";
import axios from "axios";

const AllTasks = () => {
  const [InputDiv, setInputDiv] = useState("hidden");
  const [data, setData] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3030/tasks");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const refreshData = () => {
    fetchTasks();
  };

  return (
    <>
      <div>
        <div className="w-full flex justify-end px-4 py-2">
          <button onClick={() => setInputDiv("fixed")}>
            <IoMdAdd className="text-4xl text-gray-400 hover:text-gray-100" />
          </button>
        </div>
        <Cards
          home={"true"}
          setInputDiv={setInputDiv}
          data={data}
          setData={setData}
        />
      </div>
      <InputData
        InputDiv={InputDiv}
        setInputDiv={setInputDiv}
        refreshData={refreshData}
      />
    </>
  );
};

export default AllTasks;
