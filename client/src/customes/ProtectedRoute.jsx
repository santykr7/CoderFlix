import React, { Children } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    if (!localStorage.getItem('token')) {
        return <Navigate to='/admin/login' />
    }
    return children
}

export default ProtectedRoute
