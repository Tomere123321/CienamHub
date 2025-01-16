import React from "react";
import { MdLocalMovies, MdOutlineSubscriptions } from "react-icons/md";
import { FaUsers } from "react-icons/fa"; // אייקון לממברז
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Stats = () => {
  const [movies, setMovies] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMoviesAndSubsAndMembers = async () => {
      try {
        const movies = await axios.get("http://localhost:8000/movies");
        setMovies(movies.data);

        const subs = await axios.get("http://localhost:8000/subscriptions");
        setSubscriptions(subs.data);

        const members = await axios.get("http://localhost:8000/members");
        setMembers(members.data);

      } catch (error) {
        toast.error("Failed to fetch Data");
      }
    };
    fetchMoviesAndSubsAndMembers();
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="flex items-center bg-purple-600 text-white rounded-lg shadow-lg p-6">
          <div className="text-4xl mr-4">
            <MdLocalMovies />
          </div>
          <div>
            <h2 className="text-4xl font-bold">{movies.length}</h2>
            <p className="text-sm">Amount Of Movies</p>
          </div>
        </div>

        <div className="flex items-center bg-blue-500 text-white rounded-lg shadow-lg p-6">
          <div className="text-4xl mr-4">
            <MdOutlineSubscriptions />
          </div>
          <div>
            <h2 className="text-4xl font-bold">{subscriptions.length}</h2>
            <p className="text-sm">Total Subscriptions</p>
          </div>
        </div>

        <div className="flex items-center bg-yellow-500 text-white rounded-lg shadow-lg p-6">
          <div className="text-4xl mr-4">
            <FaUsers />
          </div>
          <div>
            <h2 className="text-4xl font-bold">{members.length}</h2>
            <p className="text-sm">Total Members</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
