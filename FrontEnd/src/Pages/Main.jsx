import React, { useState, useEffect } from "react";
import { IoIosLogOut } from "react-icons/io";
import UseLogOut from "../Components/UseLogOut";
import { Outlet, Link } from "react-router-dom";

const Main = () => {
  const [activeTab, setActiveTab] = useState("Movies");
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const logOut = UseLogOut();

  useEffect(() => {
    const userName = sessionStorage.getItem("userName");
     sessionStorage.getItem("token" );
     sessionStorage.getItem("sessionTimeOut");



    setUserName(userName);
    setIsAdmin(userName === "Admin");
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <div className="mb-4 text-white text-center">
        <h2 className="text-2xl">Hello, {userName}!</h2>
      </div>
      <ul className="menu menu-horizontal bg-base-200 rounded-box">
        <li
          className={`border-r border-gray-300 ${
            activeTab === "Movies" ? "bg-gray-300 font-bold" : ""
          }`}
          onClick={() => handleTabClick("Movies")}
        >
          <Link to="/movies">Movies</Link>
        </li>
        <li
          className={`border-r border-gray-300 ${
            activeTab === "Subscriptions" ? "bg-gray-300 font-bold" : ""
          }`}
          onClick={() => handleTabClick("Subscriptions")}
        >
          <Link to="/">Subscriptions</Link>
        </li>
       { isAdmin && (
        <li
        className={`border-r border-gray-300 ${
          activeTab === "Users management" ? "bg-gray-300 font-bold" : ""
        }`}
        onClick={() => handleTabClick("Users management")}
      >
        <Link to="/manageusers">Users management</Link>
      </li>
       )  
       }
        <li
          className={`border-r border-gray-300 ${
            activeTab === "Log Out" ? "bg-gray-300 font-bold" : ""
          }`}
          onClick={() => {
            handleTabClick("Log Out");
            logOut();
          }}
        >
          <a className="flex items-center space-x-1">
            <IoIosLogOut className="text-xl" />
            <span>Log Out</span>
          </a>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default Main;
