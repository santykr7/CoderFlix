import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSearchedMovies } from '@/store/Slices/movieSlice';

const movieData = [
  {
    id: 1,
    url: '/movies/south-hindi-dubbed',
    title: 'South Hindi Movies'
  },
  {
    id: 2,
    url: '/movies/punjabi',
    title: 'Punjabi Movies'
  },
  {
    id: 3,
    url: '/movies/marathi',
    title: 'Marathi Movies'
  },
  {
    id: 4,
    url: '/movies/bollywood',
    title: 'Bollywood Movies'
  },
  {
    id: 5,
    url: '/movies/hollywood',
    title: 'Hollywood Movies'
  },
  {
    id: 6,
    url: '/movies/animated',
    title: 'Animated Movies'
  }
];

const genreData = [
  {
    id: 1,
    url: '/genres/action',
    title: 'Action'
  },
  {
    id: 2,
    url: '/genres/comedy',
    title: 'Comedy'
  },
  {
    id: 3,
    url: '/genres/drama',
    title: 'Drama'
  },
  {
    id: 4,
    url: '/genres/horror',
    title: 'Horror'
  },
  {
    id: 5,
    url: '/genres/romance',
    title: 'Romance'
  },
  {
    id: 6,
    url: '/genres/thriller',
    title: 'Thriller'
  },
  {
    id: 7,
    url: '/genres/scifi',
    title: 'Sci-Fi'
  },
  {
    id: 8,
    url: '/genres/fantasy',
    title: 'Fantasy'
  },
  {
    id: 9,
    url: '/genres/animation',
    title: 'Animation'
  }
];


const yearData = [
  {
    id: 1,
    url: '/year/2024',
    title: '2024'
  },
  {
    id: 2,
    url: '/year/2023',
    title: '2023'
  },
  {
    id: 3,
    url: '/year/2022',
    title: '2022'
  },
  {
    id: 4,
    url: '/year/2021',
    title: '2021'
  },
  {
    id: 5,
    url: '/year/2020',
    title: '2020'
  },
  {
    id: 6,
    url: '/year/2019',
    title: '2019'
  },
  {
    id: 7,
    url: '/year/2018',
    title: '2018'
  },
  {
    id: 8,
    url: '/year/2017',
    title: '2017'
  },
  {
    id: 9,
    url: '/year/2016',
    title: '2016'
  },
  {
    id: 10,
    url: '/year/2015',
    title: '2015'
  }
];


const Navbar = () => {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  const getMovieBySearch = async () => {
    const res = await axios.get(
      import.meta.env.VITE_API_URL + `/get-movies?search=${search}`
    )

    const { data } = await res.data
    console.log('searched movies', data)
    dispatch(setSearchedMovies(data))
  }

  const getMovieByFilter = async (genre, movieType, search) => {
    try {
      const queryParams = new URLSearchParams();
  
      if (genre) queryParams.append('genre', genre);
      if (movieType) queryParams.append('movieType', movieType);
      if (search) queryParams.append('search', search);
  
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-movies?${queryParams.toString()}`
      );
  
      const { data } = res.data; // `res.data` already contains `data`
      console.log('Filtered movies:', data);
  
      dispatch(setSearchedMovies(data));
    } catch (error) {
      console.error('Error fetching movies:', error.message);
    }
  };
  
  return (
    <>
      <nav className='py-10 px-8 grid gap-5'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center'>
          <h3 className='text-3xl font-extrabold'>CoderFLix</h3>
          <div className='flex sm:item-center gap-2'>
            <Input type="text" className='w-[40vw]' onChange={(e) => setSearch(e.target.value)} />
            <Button className='mx-2' onClick={getMovieBySearch}>Search</Button>
          </div>
        </div>
        <div className="">
          <Menubar>
            <MenubarMenu>
              <Link to={'/'} >
                <MenubarTrigger>Home</MenubarTrigger>
              </Link>

            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Movies</MenubarTrigger>
              <MenubarContent>
                {movieData.map(({ id, url, title }) =>
                    <MenubarItem onClick={() => getMovieByFilter(null, title)}>{title}</MenubarItem>
                )}
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Genre</MenubarTrigger>
              <MenubarContent>
                {genreData.map(({ id, url, title }) =>
                    <MenubarItem onClick={() => getMovieByFilter(title, null)}>{title}</MenubarItem>
                )}
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Year</MenubarTrigger>
              <MenubarContent>
                {yearData.map(({ id, url, title }) =>
                  <Link key={id} to={url}>
                    <MenubarItem>{title}</MenubarItem>
                  </Link>
                )}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </nav>
    </>
  )
}

export default Navbar
