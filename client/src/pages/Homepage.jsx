import MovieCard from '@/customes/MovieCard'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Homepage = () => {
  const [movies, setMovies] = useState([])
  const searchedMovies = useSelector((state) => state.movie.movies)

  const getAllPosts = async () => {
    const res = await axios.get(
      import.meta.env.VITE_API_URL + '/get-all-movies'
    )
    const { data } = await res.data
    console.log(data, 'DATA')
    setMovies(data)
  }

  useEffect(() => {
    getAllPosts()
  }, [])
  return (
    <>
      <div className='my-10 mx-8 grid md:grid-cols-4 sm:grid-cols-3 gap-2'>
        {/* <h1>This is Homepage</h1> */}
        {searchedMovies?.length < 1 ?
          (movies.map((movie) => (
            <MovieCard key={movie?._id} title={movie?.title} image={movie?.screenshot[0]?.secure_url} id={movie?._id} to={`/movie/${movie?.title}`} />
          ))) : searchedMovies.map((movie) => (
            <MovieCard key={movie?._id} title={movie?.title} image={movie?.screenshot[0]?.secure_url} id={movie?._id} to={`/movie/${movie?.title}`} />
          ))}
      </div>
    </>
  )
}

export default Homepage
