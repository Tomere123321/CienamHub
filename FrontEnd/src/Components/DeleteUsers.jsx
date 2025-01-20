import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const DeleteUsers = ({ user, closeModal }) => {
  if (!user || !user._id) {
    toast.error("User not provided");
    return null; // עצור את הרינדור אם המשתמש לא הועבר
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/users/delete/${user._id}`);
      toast.success(`User ${user.userName || user.name} deleted successfully`);
      closeModal();
    } catch (error) {
      toast.error(
        `Failed to delete user ${user.userName || user.name}. Please try again.`
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[30rem]">
        <h2 className="text-lg font-bold mb-4">Delete User</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete{" "}
          <strong>{user.userName }</strong>? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="btn btn-success text-white px-4 py-2 rounded-lg shadow hover:bg-success-600"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUsers;
