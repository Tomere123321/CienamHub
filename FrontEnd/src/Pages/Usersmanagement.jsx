import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiPlus, FiSearch } from "react-icons/fi";
import axios from "axios";
import validateSession from "../Components/ValidateSession";
import { useNavigate, useParams } from "react-router-dom";
import AddUser from "../Components/AddUser";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import EditUsers from "../Components/EditUsers";
import DeleteUsers from "../Components/DeleteUsers";
import { MdAdminPanelSettings } from "react-icons/md";

const Usersmanagement = () => {
  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [search, setSearch] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, SetisEditUserOpen] = useState(null);
  const [isDeleteUserOpen, SetisDeleteUserOpen] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  
  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/users");
        setUsers(data);
      } catch (error) {
        toast.error("Failed to Get users");
      }
    };

    const getPermissions = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/permissions");
        setPermissions(data);
      } catch (error) {
        toast.error("Failed to Get Permissions");
      }
    };
    getUsers();
    getPermissions();

    const interval = setInterval(() => {
      validateSession(navigate);
    }, 5000);

    return () => clearInterval(interval);
  }, [navigate]);

  const searchUsers = async () => {
    try {
      const filteredUsers = users.filter((user) =>
        user.userName.toLowerCase().includes(search.toLowerCase())
      );

      if (search.length < 3) {
        toast.error("Please enter at least 3 characters to search users");
        setSearch("");
        return;
      }

      if (filteredUsers.length > 0) {
        setUsers(filteredUsers);
        toast.success(`${filteredUsers.length} users found!`);
        setSearch("");
      } else {
        toast.error("No users found!");
        setSearch("");
      }
    } catch (error) {
      toast.error("Failed to search users");
    }
  };

  const permissionColor = (permission) => {
    const colorMap = {
      "View Subscriptions": "bg-blue-400 text-black",
      "View Movies": "bg-blue-400 text-black",
      "Update Subscriptions": "bg-purple-400 text-black",
      "Update Movies": "bg-purple-400 text-black",
      "Create Subscriptions": "bg-green-400 text-black",
      "Create Movies": "bg-green-400 text-black",
      "Delete Subscriptions": "bg-red-400 text-black",
      "Delete Movies": "bg-red-400 text-black",
    };
    return colorMap[permission] || "bg-gray-200 text-gray-800";
  };

  const getUserPermissions = (userId) => {
    const userPermissions = permissions.find((perm) => perm.userId === userId);
    return userPermissions?.permissions || [];
  };

  const getDate = (createdAt) => {
    const date = new Date(createdAt);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800">
          User Management
        </h1>
        <h1 className="text-xl font-semibold text-gray-800">
          Number of Users: {users.length}
        </h1>
        <div className="flex items-center gap-3">
          <button
            className="btn btn-primary flex items-center gap-2"
            onClick={() => setIsAddUserOpen(true)}
          >
            <FiPlus /> Add Users
          </button>
          <div className="form-control flex items-center relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search Users"
              className="input input-bordered pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className="btn btn-outline flex items-center gap-2"
            onClick={searchUsers}
          >
            Search
          </button>
        </div>
      </div>

      <div className="overflow-x-auto mt-6 max-h-[500px] overflow-y-auto">
        {users.length > 0 ? (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Added At</th>
                <th>Session Time Out (Minutes)</th>
                <th>is Admin</th>
                <th>Permissions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="border-b border-gray-300">
                  <td>{index + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.userName}</td>
                  <td>{getDate(user.createdAt)}</td>
                  <td>{user.sessionTimeOut}</td>
                  <td>{user.isAdmin ? "true" : "false"}</td>
                  <td>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {getUserPermissions(user._id).map((perm, i) => (
                        <span
                          key={i}
                          className={`px-2 py-1 rounded-lg text-sm text-center ${permissionColor(
                            perm
                          )}`}
                        >
                          {perm.length > 15 ? `${perm.slice(0, 15)}...` : perm}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        className="bg-blue-500 text-white hover:bg-blue-600 px-3 py-2 rounded-lg shadow-md transition duration-200 ease-in-out"
                        onClick={() => {
                          SetisEditUserOpen(true);
                          navigate(`/usersManagement/${user._id}`);
                        }}
                        title={`Edit ${user.userName}`}
                      >
                        <CiEdit className="h-5 w-5" />
                      </button>
                      <button
                        className="bg-green-500 text-white hover:bg-green-600 px-3 py-2 rounded-lg shadow-md transition duration-200 ease-in-out"
                        onClick={() => navigate(`/usersManagement/permissions/${user._id}`)}
                        title={`Edit ${user.userName} Permissions`}
                      >
                        <MdAdminPanelSettings className="h-5 w-5" />
                      </button>
                      <button
                        className="bg-red-500 text-white hover:bg-red-600 px-3 py-2 rounded-lg shadow-md transition duration-200 ease-in-out"
                        onClick={() => navigate(`/usersManagement/${user._id}`)}
                        title={`Delete ${user.userName}`}
                      >
                        <MdDelete className="h-5 w-5" />
                      </button>{" "}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-4">
            <p className="text-gray-600">No Users to display...</p>
          </div>
        )}
      </div>

      {isAddUserOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <AddUser closeModal={() => setIsAddUserOpen(false)} />
          </div>
        </div>
      )}
      {isEditUserOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <EditUsers
              user={{
                ...isEditUserOpen,
                permissions: getUserPermissions(isEditUserOpen._id),
              }}
              closeModal={() => SetisEditUserOpen(null)}
            />
          </div>
        </div>
      )}
      {isDeleteUserOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <DeleteUsers
              user={isDeleteUserOpen}
              closeModal={() => SetisDeleteUserOpen(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Usersmanagement;
