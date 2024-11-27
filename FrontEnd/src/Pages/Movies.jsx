import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";

const Movies = () => {
  const [activeTab, setActiveTab] = useState("Add Movies");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <div className="mb-4 text-white text-center">
        <h2 className="text-2xl">Movies:</h2>
      </div>
      <ul className="menu menu-horizontal bg-base-200 rounded-box">
        <li
          className={`border-r border-gray-300 ${
            activeTab === "Add Movies" ? "bg-gray-300 font-bold" : ""
          }`}
          onClick={() => handleTabClick("Add Movies")}
        >
          <Link to="add">Add Movies</Link>
        </li>
        <li
          className={`border-r border-gray-300 ${
            activeTab === "All Movies" ? "bg-gray-300 font-bold" : ""
          }`}
          onClick={() => handleTabClick("All Movies")}
        >
          <Link to="all">All Movies</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default Movies;
