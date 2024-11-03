import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";

const InputData = ({ InputDiv, setInputDiv, refreshData }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    if (!title || !desc) {
      toast.success("Please fill in both fields!");
      return;
    }

    const newTask = { title, desc, status: "Incomplete" };
    try {
      await axios.post("http://localhost:3030/tasks", newTask);
      toast.success("Task added successfully!");
      setTitle("");
      setDesc("");
      refreshData();
      setInputDiv("hidden");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.warning("Error adding task: " + error.message);
    }
  };

  return (
    <>
      <div
        className={`${InputDiv} fixed top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}
      ></div>

      <div
        className={` ${InputDiv} fixed top-0 left-0 flex items-center justify-center h-screen w-full`}
      >
        <div className="w-full lg:w-2/6 bg-gray-900 p-4 rounded-2xl">
          <div className="flex justify-end">
            <button className="text-xl" onClick={() => setInputDiv("hidden")}>
              <RxCross1 />
            </button>
          </div>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded-2xl w-full bg-gray-700 my-3"
          />
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            name="desc"
            cols="30"
            rows="5"
            placeholder="Description"
            className="px-3 py-2 rounded-2xl w-full bg-gray-700 my-3"
          />

          <button
            onClick={handleSubmit}
            className="px-3 py-2 bg-green-500 rounded-lg  text-white text-xl font-semibold hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default InputData;
