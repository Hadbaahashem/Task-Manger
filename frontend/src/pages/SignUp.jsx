import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const [Data, setData] = useState({ username: "", email: "", password: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Data.username === "" || Data.email === "" || Data.password === "") {
        toast.warning("All Fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/v1/sign-in",
          Data
        );
        setData({ username: "", email: "", password: "" });
        console.log(response);
        navigate("/login");
      }
    } catch (error) {
      toast.warning(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="p-4 bg-white text-black w-2/6 rounded">
        <div className="text-2xl font-semibold">Signup</div>
        <input
          type="text"
          className="bg-gray-200 px-3 py-2 my-3 w-full rounded"
          placeholder="username"
          name="username"
          onChange={change}
          value={Data.username}
        />
        <input
          type="email"
          className="bg-gray-200 px-3 py-2 my-3 w-full rounded"
          placeholder="email"
          name="email"
          onChange={change}
          value={Data.email}
        />
        <input
          type="password"
          className="bg-gray-200 px-3 py-2 my-3 w-full rounded"
          placeholder="password"
          name="password"
          onChange={change}
          value={Data.password}
        />
        <div className="w-full flex items-center justify-between">
          <button
            className="bg-black text-xl font-semibold text-white px-3 py-2 rounded"
            onClick={submit}
          >
            SignUp
          </button>
          <Link to="/login" className="text-gray-400 ">
            Already have an account?{" "}
            <span className="hover:text-gray-500">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
