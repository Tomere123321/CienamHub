import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Movies from "../Pages/movies";

const AddMovie = ({ closeModal }) => {
  const [newMovie, setnewMovie] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:8000/movies/add",
        newMovie
      );
      toast.success(data.message);
      setnewMovie({
        name: "",
        image: "",
        rating: "",
        premiered: "",
        genres: [],
        language: "English",
      });
      closeModal();

    } catch (error) {
      toast.error("Failed to add movie");
    }
  };

  const handleGenreChange = (genre) => {
    setnewMovie((prevState) => ({
      ...prevState,
      genres: prevState.genres.includes(genre)
        ? prevState.genres.filter((g) => g !== genre)
        : [...prevState.genres, genre],
    }));
  };
  
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Movie</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-red-500 text-lg"
          >
            X
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Movie Name
            </label>
            <input
              type="text"
              placeholder="Enter the movie name"
              className="input input-bordered w-full"
              required
              value={newMovie.name}
              onChange={(e) =>
                setnewMovie({ ...newMovie, name: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Movie Image URL
            </label>
            <input
              type="text"
              placeholder="Enter the image URL"
              className="input input-bordered w-full"
              required
              value={newMovie.image}
              onChange={(e) =>
                setnewMovie({ ...newMovie, image: e.target.value })
              }
            />
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block text-sm font-semibold mb-1">Rating</label>
              <input
                type="number"
                placeholder="1-10"
                className="input input-bordered w-full"
                required
                max="10"
                min="1"
                value={newMovie.rating}
                onChange={(e) =>
                  setnewMovie({ ...newMovie, rating: e.target.value })
                }
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-semibold mb-1">
                Premiered Date
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                required
                value={newMovie.premiered}
                onChange={(e) =>
                  setnewMovie({ ...newMovie, premiered: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Genres</label>
            <div className="flex flex-wrap gap-1">
              {genresList.map((genre) => (
                <label
                  key={genre}
                  className="flex items-center gap-2 bg-gray-200 px-2 py-1 rounded text-sm cursor-pointer"
                >
                  <input 
                  type="checkbox" 
                  value={genre} 
                  className="checkbox" 
                  checked={newMovie.genres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                  />
                  {genre}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Language</label>
            <select className="input input-bordered w-full" required
            value={newMovie.language}
            onChange={(e) => setnewMovie({ ...newMovie, language: e.target.value })}>
              <option value="English" defaultValue>
                English
              </option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={closeModal}
              type="button"
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
