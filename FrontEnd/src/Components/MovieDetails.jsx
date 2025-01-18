import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [updateMovie, setUpdateMovie] = useState({
    name: "",
    image: "",
    rating: "",
    premiered: "",
    genres: [],
    language: "English",
  });
  const genresList = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Science Fiction",
    "Thriller",
  ];
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getMovieById = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/movies/${id}`);
        setMovie(data);
        setUpdateMovie({
          name: data.name,
          image: data.image,
          rating: data.rating,
          premiered: data.premiered,
          genres: data.genres,
          language: data.language,
        });
      } catch (error) {
        toast.error("Failed to fetch movie");
      }
    };
    getMovieById();
  }, [id]);

  const updateMovieById = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/movies/update/${id}`,
        updateMovie
      );
      setUpdateMovie(data);

      toast.success(`${updateMovie.name} updated successfully`);
      setShowUpdateModal(false);
    } catch (error) {
      toast.error(`Failed to update ${updateMovie.name}`);
    }
  };

  const handleGenreChange = (genre) => {
    setUpdateMovie((movie) => ({
      ...movie,
      genres: movie.genres.includes(genre)
        ? movie.genres.filter((g) => g !== genre)
        : [...movie.genres, genre],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updateMovie);

    const { name, image, rating, premiered, language, genres } = updateMovie;

    if (
      !name ||
      !image ||
      !rating ||
      !premiered ||
      !language ||
      genres.length === 0
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    updateMovieById();
  };

  const deleteMovie = async () => {
    try {
      await axios.delete(`http://localhost:8000/movies/delete/${id}`);
      toast.success(`${movie.name} deleted successfully`);
      navigate("/movies");
    } catch (error) {
      toast.error(`Failed to delete ${movie.name}`);
    } finally {
      setShowDeleteModal(false);
    }
  };

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-700">Movie Not Found...</h1>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="w-1/3">
          <img
            src={movie.image}
            alt={movie.name}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        <div className="w-2/3 pl-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{movie.name}</h1>
            <div className="text-gray-500 mb-4">
              {new Date(movie.premiered).getFullYear()}
            </div>
            <div className="text-yellow-500 flex items-center mb-2">
              {"★".repeat(Math.floor(movie.rating))}
              <span className="text-gray-600 ml-2">({movie.rating})</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="font-semibold text-gray-700 mr-2">Genres:</span>
              {movie.genres.join(", ")}
            </div>
            <div className="flex items-center mb-4">
              <span className="font-semibold text-gray-700 mr-2">
                Language:
              </span>
              {movie.language}
            </div>
            <p className="text-gray-600">{movie.description}</p>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
              onClick={() => setShowUpdateModal(true)}
            >
              Update
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
              onClick={() => navigate("/movies")}
            >
              Back To Movies
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-bold mb-4">Delete Movie</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{movie.name}</strong>?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-400"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                onClick={deleteMovie}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Update Movie</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={updateMovie.name}
                  onChange={(e) =>
                    setUpdateMovie((movie) => ({
                      ...movie,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Image URL</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={updateMovie.image}
                  onChange={(e) =>
                    setUpdateMovie((movie) => ({
                      ...movie,
                      image: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Rating</label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={updateMovie.rating}
                  min={1}
                  max={10}
                  onChange={(e) =>
                    setUpdateMovie((movie) => ({
                      ...movie,
                      rating: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Premiered</label>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={
                    updateMovie.premiered
                      ? updateMovie.premiered.split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setUpdateMovie((movie) => ({
                      ...movie,
                      premiered: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">language</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={updateMovie.language}
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Genres</label>
                <div className="flex flex-wrap gap-2">
                  {genresList.map((genre) => (
                    <label key={genre} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={updateMovie.genres.includes(genre)}
                        onChange={() => handleGenreChange(genre)}
                      />
                      {genre}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-400"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
