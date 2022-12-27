const router = require('express').Router();
const { createMovieCheck, deleteMovieCheck } = require('../utils/celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', createMovieCheck, createMovie);

router.delete('/movies/:_id', deleteMovieCheck, deleteMovie);

module.exports = router;
