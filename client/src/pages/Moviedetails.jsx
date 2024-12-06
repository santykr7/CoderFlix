import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Button } from '@/components/ui/button';


const Moviedetails = () => {
  const [movie, setMovie] = useState({});
  const { title } = useParams()
  const getMovieDetails = async (title) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-movie-by-title/${title}`
      );
      const { data } = res.data;
      console.log(data, 'DATA2');
      setMovie(data);
    } catch (error) {
      console.error("Failed to fetch movie details", error);
    }
  };
  useEffect(() => {
    getMovieDetails(title);
  }, [title]);
  return (
    <div className="lg:w-[60vw] mx-auto px-5 my-20">
      <div className="grid gap-5">
        <h1 className="text-3xl font-bold">{title}</h1>
        <img
          src={movie?.screenshot?.[0]?.secure_url}
          className="rounded-xl"
          alt={`${movie?.title} screenshot`}
        />
        <div className="grid gap-3xl">
          <h3 className="text-2xl font-semibold">Movie Details</h3>
          <li>Full Name: {movie?.title}</li>
          <li>Movie Type: {movie?.movieType}</li>
          <li>Release Date: {movie?.releaseDate}</li>
          <li>Genre Name: {movie?.genre?.[0]}</li>
          <li>Runtime: {movie?.movieRuntime}</li>
          <li>Rating: {movie?.movieRating}</li>
          <li>Director: {movie?.movieDirector}</li>
          <li>Producers: {movie?.movieProducer?.[0]}</li>
        </div>
        <div className='grid gap-3'>
          <h3>Screenshots :</h3>
          <div className="grid md:grid-cols-2 gap-3">

          {movie?.screenshot?.length > 0 &&
            movie.screenshot.map((images) => (
              <img
                key={images?.public_id}
                src={images?.secure_url}
                alt={`${movie?.title} additional screenshot`}
                className='rounded-xl'
              />
            ))}
          </div>
          <Button className='my-5 lg:w-full' href={movie?.downloadLink} target='_blank'>Download Now</Button>
        </div>
      </div>
    </div>
  )
}

export default Moviedetails
