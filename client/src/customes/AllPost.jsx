import React, { useEffect, useState } from 'react'
import AdminMovieCard from './AdminMovieCard'
import axios from 'axios'

const AllPost = () => {
  const [movies, setMovies] = useState([])

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
    <div className='mx-8'>
      <h3 className='text-2xl font-bold'>Posts until Now</h3>
      <div className="my-10 mx-8 grid md:grid-cols-4 sm:grid-cols-3 gap-2">
        {movies.map((movie) => (
          <AdminMovieCard key={movie?._id} title={movie?.title} image={movie?.screenshot[0]?.secure_url} id={movie?._id}/>
        ))}
      </div>
    </div>
  )
}

export default AllPost
