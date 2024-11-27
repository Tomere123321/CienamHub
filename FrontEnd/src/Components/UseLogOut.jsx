// utils/LogOut.js
import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UseLogOut = () => {
  const navigate = useNavigate();

  const LogOut = async () => {
    try {
      const response = await axios.post("http://localhost:8000/auth/logout");
      const { data } = response;

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success("Logged out successfully");
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      navigate("/login");
    } catch (e) {
      toast.error(e.message || "Logout failed");
    }
  };

  return LogOut;
};
export default UseLogOut;
