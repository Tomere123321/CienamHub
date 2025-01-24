import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FaPlayCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MoviesStats = () => {
  const [movie, setMovie] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/movies");
        setMovie(data);
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };

    const getSubscriptions = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/subscriptions");
        setSubscriptions(data);
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };

    getMovies();
    getSubscriptions();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Popular Movies</h2>
      <ul>
        {subscriptions.map((subscription, index) =>
          subscription.movies.map((movie, movieIndex) => (
            <li
              key={`${index}-${movieIndex}`}
              className="flex items-center justify-between mb-4 border-b pb-2"
            >
              <div className="flex items-center gap-3">
                <img
                  src={movie.movieId.image}
                  alt={movie.movieId.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium">{movie.movieId.name}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{
                          width: `${(subscriptions.length / 10) * 100}%`,
                        }}
                      ></div>
                    </div>
                    
                  </div>
                </div>
              </div>
              <button className="text-red-500 hover:text-red-600 transition">
                <FaPlayCircle
                  title={`Play ${movie.movieId.name}`}
                  onClick={() => navigate(`/movies/${movie.movieId._id}`)}
                />
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MoviesStats;
