import React, { useEffect, useState } from "react";
import {
  MdLocalMovies,
  MdOutlineSubscriptions,
  MdPerson,
  MdLogout,
} from "react-icons/md";
import logo from "../assets/logo.png";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Outlet, Link } from "react-router-dom";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("Control Panel");
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "Control Panel",
      label: "Control panel",
      icon: "🛠️",
      path: "/ControlPanel",
    },
    {
      id: "Movies",
      label: "Movies",
      icon: <MdLocalMovies className="text-lg" />,
      path: "/movies",
    },
    {
      id: "Subscriptions",
      label: "Subscriptions",
      icon: <MdOutlineSubscriptions className="text-lg" />,
      path: "/subscriptions",
    },
  ];

  if (isAdmin) {
    menuItems.push({
      id: "Users Management",
      label: "Users Management",
      icon: <MdPerson className="text-lg" />,
      path: "/usersmanagement",
    });
  }

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
        const getUserName = localStorage.getItem("userName");

        if (getUserName) {
          setUserName(getUserName);
        }

        if (!token) {
          toast.error("You are not logged in!");
          navigate("/login");
        }

        const response = await axios.get("http://localhost:8000/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const currentUser = response.data.find(
          (user) => user.userName === localStorage.getItem("userName")
        );

        if (currentUser && currentUser.isAdmin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to check admin status"
        );
      }
    };
    checkAdmin();
  }, []);

  const LogOut = async () => {
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

  return (
    <div className="flex h-screen bg-white">
      <div className="w-64 bg-gray-100 text-gray-700 flex flex-col py-6 px-4">
        <div className="flex flex-col items-center mb-8">
          <span className="text-lg font-semibold mb-2">CINEMAHUB</span>
          <Link to="/">
            <img src={logo} alt="Logo" className="w-27 h-30" />
          </Link>
          <span>{`Hello, ${userName}!`}</span>
        </div>

        <h2 className="text-sm font-semibold mb-3">Dashboard</h2>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              navigate(item.path);
            }}
            className={`flex items-center mb-3 px-4 py-2 rounded-md ${
              activeTab === item.id
                ? "bg-purple-100 text-purple-600"
                : "hover:bg-gray-200 text-gray-600"
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            <span className="text-sm">{item.label}</span>
          </button>
        ))}

        <div className="mt-auto text-center text-gray-500 text-xs">
          <button
            className="flex items-center justify-center px-4 py-2 rounded-md text-gray-700 hover:bg-gray-300"
            onClick={LogOut}
          >
            <MdLogout className="text-2xl mr-2" />
            <span className="text-sm">Logout</span>
          </button>
          <p>v1.0.0</p>
        </div>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
