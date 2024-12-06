import React from 'react'
import { Link } from 'react-router-dom'

const MovieCard = ({title, image, to , }) => {
  return (
    <>
    <div className="">
      <Link to={to}>
        <div className='w-[13rem] rounded-lg shadow-lg'>
          <img className= 'rounded-lg' src={image} alt="img" />
          <h2 className='px-2 py-2 font-semibold'>Download:  {title}</h2>
        </div>
      </Link>
    </div>
      
    </>
  )
}

export default MovieCard
