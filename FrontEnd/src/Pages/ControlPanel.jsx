import React, { useEffect, useState } from "react";
import Stats from "../Components/Stats";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import validateSession from "../Components/ValidateSession";
import MoviesStats from "../Components/MoviesStats";

const ControlPanel = () => {
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [userPermission, setUserPermission] = useState([]);

  useEffect(() => {
    const getUserPermissions = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          toast.error("User not found");
          navigate("/login");
          return;
        }

        const { data } = await axios.get(`http://localhost:8000/permissions`);
        const matchPermissions = data.find(
          (permission) => permission.userId === userId
        );

        if (!matchPermissions) {
          toast.error("Permission not found");
          navigate("/login");
          return;
        }

        setUserPermission(matchPermissions.permissions);
        localStorage.setItem(
          "userPermission",
          JSON.stringify(matchPermissions.permissions)
        );
      } catch (error) {
        toast.error("Failed to Get Permissions");
      }
    };

    getUserPermissions();

    const interval = setInterval(() => {
      validateSession(navigate, setTimeLeft, setShowWarning);
    }, 5000);

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
  };

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <div className="w-full p-6 bg-white flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <Stats />
        </div>

        <div className="flex-1 lg:max-w-md">
          <MoviesStats />
        </div>
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
