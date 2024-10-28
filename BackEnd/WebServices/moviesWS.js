const axios = require("axios");
const MovieModel = require("../Models/movieModel");

const fetchMoviesFromWs = async () => {
    try {
      const response = await axios.get( "https://api.tvmaze.com/shows");
      
        const moviesData = response.data.map((movie) => ({
          name: movie.name,
          genres: movie.genres,
          image: movie.image ? movie.image.medium : null,
          premiered: movie.premiered ? new Date(movie.premiered) : null,
      }));
      
      await MovieModel.insertMany(moviesData);
      
  
  } catch (e) {
      console.error("Error fetching movies data:", e.message);
    }
  }
  
  module.exports = { fetchMoviesFromWs };
  