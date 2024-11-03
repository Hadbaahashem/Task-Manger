import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Data.username === "" || Data.password === "") {
        toast.warning("All Fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/v1/log-in",
          Data
        );

        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);

        dispatch(authActions.login());

        setData({ username: "", password: "" });

        navigate("/");
      }
    } catch (error) {
      toast.warning(
        error.response?.data?.message || "An error occurred during login"
      );
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="p-4 bg-white w-2/6 text-black rounded">
        <div className="text-2xl font-semibold">Login</div>

        <input
          type="text"
          className="bg-gray-2s00 px-3 py-2 my-3 w-full rounded"
          placeholder="Username"
          name="username"
          value={Data.username}
          onChange={change}
        />

        <input
          type="password"
          className="bg-gray-200 px-3 py-2 my-3 w-full rounded"
          placeholder="Password"
          name="password"
          value={Data.password}
          onChange={change}
        />

        <div className="w-full flex items-center justify-between">
          <button
            className="bg-black text-xl font-semibold text-white px-3 py-2 rounded"
            onClick={submit}
          >
            Login
          </button>
          <Link to="/signup" className="text-gray-400">
            Not having an account?{" "}
            <span className="hover:text-gray-500">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
