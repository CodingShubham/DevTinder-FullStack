import "./App.css";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";

export default function APP() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ call the hook

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/profile/view", {
        withCredentials: true,
      });

      console.log("Profile data:", res.data); // ✅ check API response
      dispatch(addUser(res.data)); // ✅ dispatch to Redux
    } catch (err) {
      console.error("Profile fetch error:", err);

      if (err.response?.status === 401) { // ✅ use err.response.status
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    console.log("Running fetchUser useEffect");
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
