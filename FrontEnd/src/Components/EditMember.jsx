import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditMember = ({ closeModal, member }) => {
  const [updatedMember, setUpdatedMember] = useState({
    name: member?.name || "",
    email: member?.email || "",
    city: member?.city || "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, city } = updatedMember;

    if (!name || !email || !city) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const { data } = await axios.put(
        `http://localhost:8000/members/update/${member._id}`,
        updatedMember
      );
      setUpdatedMember(data);
      toast.success(`Member updated successfully`);
      closeModal(); 
      navigate("/subscriptions"); 
    } catch (error) {
      toast.error(
        `Failed to update member ${updatedMember.name}. Please try again.`
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[30rem]">
        <h2 className="text-lg font-bold mb-4">Edit Member</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={updatedMember.name}
              onChange={(e) =>
                setUpdatedMember({ ...updatedMember, name: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={updatedMember.email}
              onChange={(e) =>
                setUpdatedMember({ ...updatedMember, email: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">City</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={updatedMember.city}
              onChange={(e) =>
                setUpdatedMember({ ...updatedMember, city: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="btn btn-error text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
              onClick={closeModal} 
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success text-white px-4 py-2 rounded-lg shadow hover:bg-sucsses-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMember;
