import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddMember = ({ closeModal }) => {
  const [member, setMember] = useState({
    name: "",
    email: "",
    city: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, city } = member;

    if (!name || !email || !city) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:8000/members/add", member);
      toast.success(data.message || "Member added successfully");
      setMember({
        name: "",
        email: "",
        city: "",
      });
      closeModal();
    } catch (error) {
      toast.error("Failed to add member");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Member</h1>

      <form onSubmit={handleSubmit}>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="input input-bordered w-full"
            placeholder="Enter name"
            value={member.name}
            onChange={(e) => setMember({ ...member, name: e.target.value })}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="input input-bordered w-full"
            placeholder="Enter email"
            value={member.email}
            onChange={(e) => setMember({ ...member, email: e.target.value })}
            required
          />
        </div>

        
        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium mb-2">
            City:
          </label>
          <input
            type="text"
            id="city"
            className="input input-bordered w-full"
            placeholder="Enter city"
            value={member.city}
            onChange={(e) => setMember({ ...member, city: e.target.value })}
            required
          />
        </div>

       
        <div className="flex justify-between">
          <button
            type="button"
            className="btn btn-error"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add Member
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMember;