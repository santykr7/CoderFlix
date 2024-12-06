import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
    name: 'navSlice',
    initialState: {
        tab: ' create-post'
    },

    reducers: {
        setTab: (state, action) => {
            state.tab = action.payload
        }
    }
})

export const {setTab} = navSlice.actions;

export default navSlice.reducer