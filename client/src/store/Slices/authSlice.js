import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',

    initialState: {
        user: null,
        token: localStorage.getItem('token') || null,
        isAuthenticated: !!localStorage.getItem('token')
    },

    reducers: {
        login: (state, action) => {
            state.token = action.payload.token
            state.user = action.payload.user;
            state.isAuthenticated = true
            localStorage.setItem('token', action.payload.token)
        },
        logout: (state) => {
            state.token = null
            state.user = null;
            state.isAuthenticated = false
            localStorage.removeItem('token');
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer