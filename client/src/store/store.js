import { configureStore } from "@reduxjs/toolkit"
import navSlice from './Slices/navSlice'
import authSlice from './Slices/authSlice'
import movieSlice from './Slices/movieSlice'

export const store = configureStore({
  reducer: {
    nav: navSlice,
    auth: authSlice,
    movie: movieSlice
  }
})
