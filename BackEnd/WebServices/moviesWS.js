const axios = require("axios");
const MovieModel = require("../Models/movieModel");

const fetchMoviesFromWs = async () => {
  try {
    const existingMovies = await MovieModel.countDocuments();
    if (existingMovies > 0) {
      console.log("Movies data already exists in the DB");
      return;
    }
    const response = await axios.get("https://api.tvmaze.com/shows");

    const moviesData = response.data.map((movie) => ({
      name: movie.name,
      genres: movie.genres,
      image: movie.image,
      premiered: movie.premiered ? new Date(movie.premiered) : null,
      language: movie.language,
      rating: movie.rating.average,
    }));

    await MovieModel.insertMany(moviesData);
  } catch (e) {
    console.error("Error fetching movies data:", e.message);
  }
};

module.exports = { fetchMoviesFromWs };
