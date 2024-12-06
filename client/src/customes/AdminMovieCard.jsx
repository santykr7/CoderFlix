import React from 'react'
import { Link } from 'react-router-dom'
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

const AdminMovieCard = ({
    title = 'Movie Title',
    image='https://th.bing.com/th/id/OIP.cnjDHo5kR07KF4fvchOCnAHaE7?w=238&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    to = '#',
    id = '1'
}) => {
  const { toast } = useToast();

  const deleteMovie = async(getId) => {
    const res = await axios.delete(
      import.meta.env.VITE_API_URL + '/remove-movie/'+ getId ,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      }
    )
    const data = await res.data
    if(data.success) {
      toast({ description: 'Movie deleted successfully' });
    }else{
      toast({ 
        variant: 'destructive',
        description: 'getting error' });
    }

  }
  return (
    <>
      <Link to={to}>
        <div className='w-[13rem] rounded-lg shadow-lg relative'>
          <img className= 'rounded-lg' src={image} alt="img" />
          <MdDeleteForever className='absolute top-5 right-5 hover:scale-150 ease-in-out' style={{color:'white'}} onClick={() => deleteMovie(id)}/>
          <h2 className='px-2 py-2 font-semibold'>{title}</h2>
        </div>
      </Link>

    </>
  )
}

export default AdminMovieCard
