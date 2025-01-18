import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const AddUser = ({ closeModal }) => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    sessionTimeOut: "",
    isAdmin: false,
    userName: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !newUser.firstName ||
      !newUser.lastName ||
      !newUser.sessionTimeOut ||
      !newUser.userName ||
      !newUser.password
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (newUser.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    const sessionTimeOutWithM = newUser.sessionTimeOut.endsWith("m")
      ? newUser.sessionTimeOut
      : `${newUser.sessionTimeOut}m`;

    const userToSubmit = {
      ...newUser,
      sessionTimeOut: sessionTimeOutWithM,
    };

    try {
      const { data } = await axios.post(
        "http://localhost:8000/users/add",
        userToSubmit
      );
      toast.success(data.message || "User added successfully");
      setNewUser({
        firstName: "",
        lastName: "",
        sessionTimeOut: "",
        isAdmin: false,
        userName: "",
        password: "",
      });
      closeModal();
    } catch (error) {
      toast.error("Failed to add user");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            className="input input-bordered w-full"
            required
            value={newUser.userName}
            onChange={(e) =>
              setNewUser({ ...newUser, userName: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">First Name</label>
          <input
            type="text"
            placeholder="Enter first name"
            className="input input-bordered w-full"
            required
            value={newUser.firstName}
            onChange={(e) =>
              setNewUser({ ...newUser, firstName: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Last Name</label>
          <input
            type="text"
            placeholder="Enter last name"
            className="input input-bordered w-full"
            required
            value={newUser.lastName}
            onChange={(e) =>
              setNewUser({ ...newUser, lastName: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Session Timeout (Minutes)
          </label>
          <input
            type="number"
            placeholder="Enter session timeout in minutes"
            className="input input-bordered w-full"
            required
            min={1}
            max={1000}
            value={newUser.sessionTimeOut}
            onChange={(e) =>
              setNewUser({ ...newUser, sessionTimeOut: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            className="input input-bordered w-full"
            required
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
        </div>
        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            checked={newUser.isAdmin}
            onChange={(e) =>
              setNewUser({ ...newUser, isAdmin: e.target.checked })
            }
          />
          <label className="text-sm font-semibold">IsAdmin</label>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={closeModal} type="button" className="btn btn-error">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
