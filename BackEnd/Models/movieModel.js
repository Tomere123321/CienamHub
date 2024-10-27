const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    genres: [{ type: String }],
    image: { type: String },
    premiered: { type: Date }
  });

const movieModel = mongoose.model('movie', movieSchema);

module.exports = movieModel;