import React, { useEffect, useState } from "react";
// import Sidebar from "../Components/SideBar";
import Stats from "../Components/Stats";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const ControlPanel = () => {
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const validateSession = () => {
      const sessionTimeOut = localStorage.getItem("sessionTimeOut");

      if (!sessionTimeOut) {
        toast.error("You are not logged in!");
        navigate("/login");
        return;
      }

      const timeValue = parseInt(sessionTimeOut.slice(0, -1), 10);
      const timeUnit = sessionTimeOut.slice(-1);
      let sessionDurationMs;

      if (timeUnit === "m") {
        sessionDurationMs = timeValue * 60 * 1000;
      } else if (timeUnit === "h") {
        sessionDurationMs = timeValue * 60 * 60 * 1000;
      } else {
        toast.error("Invalid session timeout format!");
        localStorage.clear();
        navigate("/login");
        return;
      }

      const sessionEndTime = Date.now() + sessionDurationMs;

      if (!localStorage.getItem("sessionEndTime")) {
        localStorage.setItem("sessionEndTime", sessionEndTime.toString());
      }

      const currentTime = Date.now();
      const savedSessionEndTime = parseInt(
        localStorage.getItem("sessionEndTime"),
        10
      );

      const timeRemaining = savedSessionEndTime - currentTime;
      setTimeLeft(Math.ceil(timeRemaining / 1000 / 60));
      
      if (timeRemaining <= 5 * 60 * 1000 && timeRemaining > 0) {
        setShowWarning(true);
      }

      if (currentTime > savedSessionEndTime) {
        toast.error("Session has expired, Please Log In Again!");
        localStorage.clear();
        navigate("/login");
      }
    };

    validateSession();

    const interval = setInterval(validateSession, 5000);
    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:8000/auth/logout");
  
      if (response.status === 200) {
        localStorage.clear();
        toast.success("Logged out successfully");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  };

  const handleStayLoggedIn = () => {
    setShowWarning(false);
  }
  
  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <div className="w-full p-6 bg-white">
        <Stats />
      </div>

      {showWarning && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p className="text-lg font-bold mb-4 text-purple-700">
              Your token will expire in the next {timeLeft} minutes
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleLogout}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
              <button
                onClick={handleStayLoggedIn}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Stay Logged In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
