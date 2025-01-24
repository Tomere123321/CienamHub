const movieService = require('../Services/movieService');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const movie = await movieService.getMovie();
        return res.status(200).json(movie);

    } catch (e) {
        console.log('Error in movieService:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => { 
    try {
        const { id } = req.params;
        const movieId = await movieService.getMovieById(id);
        return res.status(200).json(movieId);
    
    } catch (e) {
        console.log('Error in get MovieId:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/add', async (req, res) => { 
    try {
        const newData = req.body;
        const newMovie = await movieService.addMovie(newData); 
         return res.status(201).json({ message: newMovie });
    
        } catch (e) {
        console.log('Error in Add Movie:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/update/:id', async (req, res) => { 
    try {
        const { id } = req.params;
        const newData = req.body;
        const updateMovie = await movieService.updateMovie(id, newData);
        return res.status(200).json({ message: updateMovie });
    
    } catch (e) {
        console.log('Error in update Movie:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteMovie = await movieService.deleteMovie(id);
        return res.status(200).json({ message: deleteMovie });
   
    } catch (e) {
        console.log('Error in deleteMovie:', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
