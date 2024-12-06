const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: {
      type: String,
      // required: true
    },
    movieRuntime: {
      type: Number, // Runtime in minutes
      // required: true
    },
    genre: {
      type: [String], // Array to hold multiple genres
      enum: ['Action','Comedy','Drama','Horror','Romance'],
      // required: true
    },
    movieType: {
      type: String,
      enum: ['South Hindi Dubbed','Adult Movies','Bollywood Movies','Hollywood Movies','Punjabi Movies']
    },
    movieDirector: {
      type: String,
      // required: true
    },
    movieProducer: {
      type: [String], // Array to hold multiple producers
      // required: true
    },
    releaseDate: {
      type: Date,
      // required: true
    },
    movieRating: {
      type: Number,
      min: 0,
      max: 10
    },
    screenshot : {
      type: Array
    },
    downloadLink: {
      type: String
    }
  });

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie