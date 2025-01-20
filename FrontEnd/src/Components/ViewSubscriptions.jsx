import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import validateSession from "../Components/ValidateSession";
import AddSubscriptions from "../Components/AddSubscription";
import { MdDelete } from "react-icons/md";
import DeleteMember from "./DeleteMember";
import DeleteSubscription from "./DeleteSubscription";

const ViewSubscriptions = () => {
  const [member, setMember] = useState("");
  const [subscriptions, setSubscriptions] = useState([]);
  const [isAddsubOpen, setIsAddsubOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getMemberData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/members/${id}`);
        setMember(data);
      } catch (error) {
        toast.error("Failed to fetch member details");
      }
    };

    const getSubscriptionsData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/subscriptions`);
        const filteredData = data.filter(
          (subscription) => subscription.memberId._id === id
        );
        setSubscriptions(filteredData);
      } catch (error) {
        toast.error("Failed to fetch subscriptions");
      }
    };
    getMemberData();
    getSubscriptionsData();

    const interval = setInterval(() => {
      validateSession(navigate);
    }, 5000);

    return () => clearInterval(interval);
  }, [id, navigate]);

  if (!member) {
    return <div>Loading member details...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800">Subscriptions</h1>
        <h1 className="text-xl font-semibold text-gray-800">
          {member?.name} Subscriptions: {subscriptions?.length}
        </h1>
        <div className="flex items-center gap-3">
          <button
            className="btn btn-primary flex items-center gap-2"
            onClick={() => setIsAddsubOpen(true)}
          >
            <FiPlus /> Add Subscriptions
          </button>
        </div>
      </div>

      <div className="overflow-x-auto mt-6">
        {subscriptions.length > 0 ? (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {subscriptions.map((subscription, index) => {
                const movieImage =
                  subscription.movies?.[0]?.movieId?.image || "No Image";
                const movieName =
                  subscription.movies?.[0]?.movieId?.name || "No Name";
                const movieDate = subscription.movies?.[0]?.date
                  ? new Date(subscription.movies[0].date).toLocaleDateString()
                  : "No Date";

                return (
                  <tr
                    key={subscription._id}
                    className="border-b border-gray-300"
                  >
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={movieImage}
                        alt="Movie"
                        className="w-20 h-20 rounded"
                      />
                    </td>
                    <td>{movieName}</td>
                    <td>{movieDate}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          className="bg-red-500 text-white px-3 py-2 rounded-lg shadow-md hover:bg-red-600"
                          title={`Delete ${member.name} subscription`}
                          onClick={() => setIsDeleteOpen(member)}
                        >
                          <MdDelete className="h-5 w-5" />
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
            <p className="text-gray-600">No Subscriptions to display...</p>
          </div>
        )}
      </div>

      {isAddsubOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <AddSubscriptions
              closeModal={() => setIsAddsubOpen(false)}
              currentMemberId={id}
            />
          </div>
        </div>
      )}

      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <DeleteSubscription
              member={isDeleteOpen}
              closeModal={() => setIsDeleteOpen(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewSubscriptions;
