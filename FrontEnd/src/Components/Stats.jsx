import React from "react";
import { MdLocalMovies, MdOutlineSubscriptions } from "react-icons/md";

const Stats = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 bg-gray-900 p-6">
      <div className="flex flex-col justify-between bg-gray-800 rounded-lg shadow-lg p-6 w-full md:w-1/2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm text-gray-400">TOTAL MOVIES</h3>
          <div className="text-gray-400 text-2xl">
            <MdLocalMovies />
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-3xl font-bold text-white">150</h2>
          <p className="text-sm text-gray-400 mt-2">Number of movies available</p>
        </div>
      </div>

      <div className="flex flex-col justify-between bg-gray-800 rounded-lg shadow-lg p-6 w-full md:w-1/2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm text-gray-400">TOTAL SUBSCRIPTIONS</h3>
          <div className="text-gray-400 text-2xl">
            <MdOutlineSubscriptions />
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-3xl font-bold text-white">75</h2>
          <p className="text-sm text-gray-400 mt-2">Number of active subscriptions</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
