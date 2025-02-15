import React, { useState, useEffect } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import validateSession from "../Components/ValidateSession";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import AddMember from "../Components/AddMember";
import EditMember from "../Components/EditMember";
import { MdDelete } from "react-icons/md";
import DeleteMember from "../Components/DeleteMember";
import { MdOutlineSubscriptions } from "react-icons/md";
import {validatePermission} from "../Components/ValidatePermission";

const Subscriptions = () => {
  const [members, setMembers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [deletingMember, setDeletingMember] = useState(null);
  const [permissions, setPermissions] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const getPermissions = async () => { 
        const userPermissions = await validatePermission(navigate);
        setPermissions(userPermissions);
       }
    
       const getMembers = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/members");
        setMembers(data);
        setAllMembers(data);
      } catch (error) {
        toast.error("Failed to fetch members");
      }
    };

    const getSubscriptions = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/subscriptions");
        setSubscriptions(data);
      } catch (error) {
        toast.error("Failed to fetch subscriptions");
      }
    };

    getMembers();
    getSubscriptions();
    getPermissions();

    const interval = setInterval(() => {
      validateSession(navigate);
    }, 5000);

    return () => clearInterval(interval);
  }, [navigate]);
  
  const hasPermission = (permission) => permissions.includes(permission);


  const searchMembers = async () => {
    try {
      const filteredMembers = allMembers.filter((member) =>
        member.name.toLowerCase().includes(search.toLowerCase())
      );

      if (search.length < 3) {
        toast.error("Please enter at least 3 characters to search members");
        setMembers(allMembers);
        setSearch("");
        return;
      }

      if (filteredMembers.length > 0) {
        setMembers(filteredMembers);
        toast.success(`${filteredMembers.length} members found!`);
        setSearch("");
      } else {
        toast.error("No members found!");
        setMembers(allMembers);
        setSearch("");
      }
    } catch (error) {
      toast.error("Failed to search members");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800">Subscriptions</h1>
        <h1 className="text-xl font-semibold text-gray-800">
          Number of Members: {allMembers?.length}
        </h1>
        <div className="flex items-center gap-3">
          {hasPermission("Create Subscriptions") && (
          <button
            className="btn btn-primary flex items-center gap-2"
            onClick={() => setIsAddMemberOpen(true)}
          >
            <FiPlus /> Add Members
          </button>
          )}
          <div className="form-control flex items-center relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search Members"
              className="input input-bordered pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={searchMembers}
            className="btn btn-outline flex items-center gap-2"
          >
            Search
          </button>
        </div>
      </div>

      <div className="overflow-x-auto mt-6">
        {members.length > 0 ? (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Subscriptions Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => {
                const subscriptionCount = subscriptions.filter(
                  (sub) => sub.memberId._id === member._id
                ).length;

                return (
                  <tr key={member._id} className="border-b border-gray-300">
                    <td>{index + 1}</td>
                    <td>{member.name}</td>
                    <td>{member.email}</td>
                    <td>{member.city}</td>
                    <td>{subscriptionCount || 0}</td>
                    <td>
                      <div className="flex items-center space-x-2">
                        {hasPermission("Update Subscriptions") && (
                        <button
                          className="bg-blue-500 text-white hover:bg-blue-600 hover:text-black-500 px-3 py-2 rounded-lg shadow-md transition duration-200 ease-in-out"
                          onClick={() => setEditingMember(member)}
                          title={`Edit ${member.name}`}
                        >
                          <CiEdit className="h-5 w-5" />
                        </button>
                        )}
                        {hasPermission("Delete Subscriptions") && (
                        <button
                          className="bg-red-500 text-white hover:bg-red-600 hover:text-black-300 px-3 py-2 rounded-lg shadow-md transition duration-200 ease-in-out"
                          onClick={() => setDeletingMember(member)}
                          title={`Delete ${member.name}`}
                        >
                          <MdDelete className="h-5 w-5" />
                        </button>
                        )}
                        <button
                          className="bg-green-500 text-white hover:bg-green-600 hover:text-black-700 px-3 py-2 rounded-lg shadow-md transition duration-200 ease-in-out"
                          onClick={() => navigate(`/subscriptions/${member._id}`)}
                          title={`View ${member.name} Subscriptions`}
                        >
                          <MdOutlineSubscriptions className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-4">
            <p className="text-gray-600">No Members to display...</p>
          </div>
        )}
      </div>

      {isAddMemberOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <AddMember closeModal={() => setIsAddMemberOpen(false)} />
          </div>
        </div>
      )}
      {editingMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <EditMember
              member={editingMember}
              closeModal={() => setEditingMember(null)}
            />
          </div>
        </div>
      )}
      {deletingMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <DeleteMember
              member={deletingMember}
              closeModal={() => setDeletingMember(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
