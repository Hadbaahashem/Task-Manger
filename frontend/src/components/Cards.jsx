import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";

const Cards = ({ home, setInputDiv, data, setData }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3030/tasks/${id}`)
      .then(() => {
        toast.success("Task Deleted");
        setData((prevData) => prevData.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.error("Error deleting task:", err);
        toast.error("Error deleting task: " + err.message);
      });
  };

  const handleToggleComplete = (id) => {
    const taskToToggle = data.find((item) => item.id === id);
    const updatedStatus =
      taskToToggle.status === "Incomplete" ? "Complete" : "Incomplete";

    axios
      .put(`http://localhost:3030/tasks/${id}`, {
        ...taskToToggle,
        status: updatedStatus,
      })
      .then(() => {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, status: updatedStatus } : item
          )
        );
        toast.success(`Task marked as ${updatedStatus}`);
      })
      .catch((err) => {
        console.error("Error updating task status:", err);
        toast.error("Error updating task status: " + err.message);
      });
  };

  const handleEdit = (item) => {
    setEditingTask(item.id);
    setTitle(item.title);
    setDesc(item.desc);
  };

  const handleUpdateTask = (id) => {
    const updatedTask = { ...data.find((item) => item.id === id), title, desc };

    axios
      .put(`http://localhost:3030/tasks/${id}`, updatedTask)
      .then(() => {
        setData((prevData) =>
          prevData.map((item) => (item.id === id ? updatedTask : item))
        );
        toast.success("Task updated successfully!");
        setEditingTask(null);
        setTitle("");
        setDesc("");
      })
      .catch((err) => {
        console.error("Error updating task:", err);
        toast.error("Error updating task: " + err.message);
      });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data.map((items) => (
        <div
          key={items.id}
          className="flex flex-col justify-between bg-gray-800 p-4 rounded-sm"
        >
          {editingTask === items.id ? (
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-3 py-2 rounded w-full bg-gray-700 my-1"
              />
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="px-3 py-2 rounded w-full bg-gray-700 my-1"
                rows="2"
              />
              <button
                onClick={() => handleUpdateTask(items.id)}
                className="bg-blue-400 p-2 rounded text-white"
              >
                Save
              </button>
              <button
                onClick={() => setEditingTask(null)}
                className="bg-gray-500 p-2 rounded text-white"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <div>
                <h3 className="text-lg font-semibold">{items.title}</h3>
                <p className="text-gray-300 my-2">{items.desc}</p>
              </div>
              <div className="mt-4 w-full flex items-center">
                <button
                  className={`${
                    items.status === "Incomplete"
                      ? "bg-gray-500"
                      : "bg-green-700"
                  } p-2 rounded`}
                  onClick={() => handleToggleComplete(items.id)}
                >
                  {items.status}
                </button>
                <div className="text-white p-2 w-3/6 text-2xl font-semibold flex justify-around">
                  <button onClick={() => handleEdit(items)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(items.id)}>
                    <MdDelete />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
      {home === "true" && (
        <button
          className="flex flex-col justify-center items-center bg-gray-800 p-4 rounded-sm text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300"
          onClick={() => setInputDiv("fixed")}
        >
          <IoMdAdd className="text-5xl" />
          <h2 className="text-2xl mt-4">Add Task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
