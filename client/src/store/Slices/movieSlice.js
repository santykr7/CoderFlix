import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: 'movie',
    initialState:{
        movies:[]
    },
    reducers:{
        setSearchedMovies: (state,action) => {
            state.movies = action.payload
        }
    }

})

export const {setSearchedMovies} = movieSlice.actions
export default movieSlice.reducer