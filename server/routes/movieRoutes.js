const { createMovie, removeMovie, getAllMovie, getMovieByTitle, getMovies } = require('../controllers/movieController')
const verifyToken = require('../middleware/verifyToken')
const router = require('express').Router()

router.post('/create-movie', verifyToken, createMovie)
router.delete('/remove-movie/:id', verifyToken, removeMovie)
router.get('/get-all-movies',getAllMovie)
router.get('/get-movie-by-title/:title',getMovieByTitle)
router.get('/get-movies',getMovies)

module.exports = router
