import React, { useState, useEffect } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import AddSubscription from "../Components/AddSubscription";
import validateSession from "../Components/ValidateSession";
import { useNavigate } from "react-router-dom";

const Subscriptions = () => {
  const [members, setMembers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [isAddsubOpen, setIsAddsubOpen] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
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

    const interval = setInterval(() => {
      validateSession(navigate);
    }, 5000);

    return () => clearInterval(interval);
  }, [navigate]);

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
          <button
            className="btn btn-primary flex items-center gap-2"
            onClick={() => setIsAddsubOpen(true)}
          >
            <FiPlus /> Add Subscriptions
          </button>
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

      {isAddsubOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <AddSubscription closeModal={() => setIsAddsubOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
