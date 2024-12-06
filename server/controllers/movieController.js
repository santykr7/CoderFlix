const Movie = require('../models/movie');

const createMovie = async (req, res) => {
  const {
    title,
    movieRuntime,
    movieType,
    genre,
    movieDirector,
    movieProducer,
    releaseDate,
    movieRating,
    screenshot,
    downloadLink,
  } = req.body;

  try {
    const movie = new Movie({
      title,
      movieRuntime,
      movieType,
      genre,
      movieDirector,
      movieProducer,
      releaseDate,
      movieRating,
      screenshot,
      downloadLink,
    });
    await movie.save();
    return res
      .status(201)
      .json({ success: true, message: 'Movie created successfully', movie });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const removeMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }

    return res.status(200).json({ success: true, message: 'Movie deleted', movie });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllMovie = async (req, res) => {
  try {
    const movies = await Movie.find({});
    if (movies.length === 0) {
      return res.status(404).json({ success: false, message: 'No movies found' });
    }

    return res.status(200).json({ success: true, message: 'All movies retrieved', data: movies });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getMovieByTitle = async (req, res) => {
  const { title } = req.params;
  try {
    const movie = await Movie.findOne({ title: title });
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }

    return res.status(200).json({ success: true, message: 'Movie retrieved', data: movie });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getMovies = async (req, res) => {
  const { page = 1, limit = 10, genre, movieType, search } = req.query;
  
  try {
    const query = {};
    
    if (genre && genre !== 'null') query.genre = genre.split('%20').join(' ');
    if (movieType && movieType !== 'null') query.movieType = movieType.split('%20').join(' ');
    if (search) query.title = { $regex: search, $options: 'i' };
    
    const skip = (Math.max(1, Number(page)) - 1) * Math.max(1, Number(limit));

    const movies = await Movie.find(query).skip(skip).limit(Number(limit));
    const totalMovies = await Movie.countDocuments(query);

    if (!movies.length) {
      return res.status(404).json({
        success: false,
        message: 'No movies found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Movies retrieved',
      data: movies,
      totalMovies,
      currentPage: Number(page),
      totalPages: Math.ceil(totalMovies / Number(limit)),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createMovie,
  removeMovie,
  getAllMovie,
  getMovieByTitle,
  getMovies,
};
