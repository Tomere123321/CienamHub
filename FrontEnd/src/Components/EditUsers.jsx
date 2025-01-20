import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import validateSession from "./ValidateSession";

const EditUsers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateUser, setUpdateUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    sessionTimeOut: "",
    password: "",
    isAdmin: false,
  });
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        toast.error("No user ID provided");
        return;
      }
      try {
        const { data } = await axios.get(`http://localhost:8000/users/${id}`);
        setUpdateUser({
          firstName: data?.firstName || "",
          lastName: data?.lastName || "",
          userName: data?.userName || "",
          sessionTimeOut: parseInt(data?.sessionTimeOut),
          isAdmin: data?.isAdmin || false,
          password: data?.password || "",
        });
      } catch (error) {
        toast.error("Failed to fetch user data. Please try again.");
      }
    };

    const getPermissions = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/permissions");
        setPermissions(data);
      } catch (error) {
        toast.error("Failed to get permissions");
      }
    };

    fetchUser();
    getPermissions();

    const interval = setInterval(() => {
      validateSession(navigate);
    }, 5000);

    return () => clearInterval(interval);
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, userName, sessionTimeOut, isAdmin, password } =
      updateUser;

    if (!firstName || !lastName || !userName || !sessionTimeOut) {
      toast.error("Please fill in all required fields");
      return;
    }

    const updatedData = {
      ...updateUser,
      sessionTimeOut: `${sessionTimeOut}m`,
    };

    try {
      await axios.put(`http://localhost:8000/users/update/${id}`, updatedData);
      toast.success("User updated successfully");
      navigate("/usersmanagement");
    } catch (error) {
      toast.error("Failed to update User. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">First Name:</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={updateUser.firstName}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, firstName: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Last Name:</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={updateUser.lastName}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, lastName: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Username:</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={updateUser.userName}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, userName: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Password:</label>
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder=" password"
            value={updateUser.password || ""}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, password: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">
            Session Time Out (Minutes):
          </label>
          <input
            type="number"
            className="input input-bordered w-full"
            min={1}
            max={1000}
            value={updateUser.sessionTimeOut}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, sessionTimeOut: e.target.value })
            }
          />
        </div>
        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            checked={updateUser.isAdmin}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, isAdmin: e.target.checked })
            }
          />
          <label className="text-sm font-medium">Is Admin</label>
        </div>
        
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="btn btn-error text-white"
            onClick={() => navigate("/usersmanagement")}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-success text-white">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUsers;

