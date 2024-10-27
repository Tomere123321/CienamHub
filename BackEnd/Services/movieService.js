const movieModel = require('../Models/movieModel');

const getMovie = async () => {
    return await movieModel.find({});
}

const getMovieById = async (id) => {
    return await movieModel.findById(id);
}

const addMovie = async (member) => {
    const newMember = new movieModel(member);
     await newMember.save();
     return 'Movie added successfully';
}

const updateMovie = async (id, member) => {
    await movieModel.findByIdAndUpdate(id, member);
    return 'Movie updated successfully';
}

const deleteMovie = async (id) => {
    await movieModel.findByIdAndDelete(id);
    return 'Movie deleted successfully';
}

module.exports = { getMovie, getMovieById, addMovie, updateMovie, deleteMovie };