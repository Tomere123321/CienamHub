import React, { useState, useEffect } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { FiTag } from "react-icons/fi";
import { BiWorld } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-hot-toast";
import AddMovie from "../Components/AddMovie";
import { Link, useNavigate } from "react-router-dom";
import validateSession from "../Components/ValidateSession";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [allmovies, setAllMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [isAddMovieOpen, setIsAddMovieOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/movies");
        setMovies(data);
        setAllMovies(data);
      } catch (error) {
        toast.error("Failed to fetch movies");
      }
    };
    fetchMovies();
    const interval = setInterval(() => {
      validateSession(navigate);
    }, 5000);

    return () => clearInterval(interval);
  }, [navigate]);

  const searchMovies = async () => {
    try {
      const filteredMovies = allmovies.filter((movie) =>
        movie.name.toLowerCase().includes(search.toLowerCase())
      );

      if (search.length < 3) {
        toast.error("Please enter at least 3 characters to search movies");
        setMovies(allmovies);
        setSearch("");
        return;
      }

      if (filteredMovies.length > 0) {
        setMovies(filteredMovies);
        toast.success(`${filteredMovies.length} movies found!`);
        setSearch("");
      } else {
        toast.error("No movies found!");
        setMovies(allmovies);
        setSearch("");
      }
    } catch (error) {
      toast.error("Failed to search movies");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800">Movies</h1>
        <h1 className="text-1xl font-semibold text-gray-800">
          Number of Movies: {allmovies.length}
        </h1>

        <div className="flex items-center gap-3">
          <button
            className="btn btn-primary flex items-center gap-2"
            onClick={() => setIsAddMovieOpen(true)}
          >
            <FiPlus /> Add Movie
          </button>

          <div className="form-control flex items-center relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search Movie"
              className="input input-bordered pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            onClick={searchMovies}
            className="btn btn-outline flex items-center gap-2"
          >
            Search
          </button>
        </div>
      </div>

      <div className="mt-6">
        {movies.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {movies.map((movie) => (
              <div
                key={movie._id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <Link to={`/movies/${movie._id}`}>
                  <img
                    src={movie.image}
                    alt={movie.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold">
                    {movie.name}{" "}
                    <span className="text-gray-500">
                      ({new Date(movie.premiered).getFullYear()})
                    </span>
                  </h3>
                  <div className="flex items-center text-gray-500 mt-2">
                    <FiTag className="mr-2" />
                    <div className="flex gap-2">
                      {movie.genres.map((genre, index) => (
                        <span key={index} className="text-sm">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 mt-2">
                    <BiWorld className="mr-2" />
                    <span className="text-sm">{movie.language}</span>
                  </div>
                  <div className="flex items-center text-gray-500 mt-2">
                    <AiFillStar className="mr-2 text-yellow-500" />
                    <span className="text-sm">{movie.rating}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No movies to display!</p>
        )}
      </div>
      {isAddMovieOpen && (
        <AddMovie closeModal={() => setIsAddMovieOpen(false)} />
      )}
    </div>
  );
};

export default Movies;
