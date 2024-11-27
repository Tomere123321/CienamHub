import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";

const UsersManagement = () => {
  const [activeTab, setActiveTab] = useState("Add Users");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);    
  };

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <div className="mb-4 text-white text-center">
        <h2 className="text-2xl">Users Management:</h2>
      </div>
      <ul className="menu menu-horizontal bg-base-200 rounded-box">
        <li
          className={`border-r border-gray-300 ${
            activeTab === "all Users" ? "bg-gray-300 font-bold" : ""
          }`}
          onClick={() => handleTabClick("all Users")}
        >
          <Link to="all">All Users</Link> 
        </li>
        <li
          className={`border-r border-gray-300 ${
            activeTab === "add Users" ? "bg-gray-300 font-bold" : ""
          }`}
          onClick={() => handleTabClick("add Users")}
        >
          <Link to="add">add Users</Link> 
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default UsersManagement;
