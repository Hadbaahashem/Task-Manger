import React, { useEffect } from "react";
import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import ImpTasks from "./pages/ImpTasks";
import CompTasks from "./pages/CompTasks";
import IncompTasks from "./pages/IncompTasks";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";

const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    } else if (!isLoggedIn === false) {
      navigate("/signup");
    }
  }, []);
  return (
    <div className="bg-gray-900 text-white min-h-screen p-2 relative overflow-auto ">
      <ToastContainer></ToastContainer>
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route index element={<AllTasks />} />
          <Route path="/important" element={<ImpTasks />} />
          <Route path="/completed" element={<CompTasks />} />
          <Route path="/incompleted" element={<IncompTasks />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
