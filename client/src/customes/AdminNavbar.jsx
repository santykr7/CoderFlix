import { Button } from '@/components/ui/button'
import { logout } from '@/store/Slices/authSlice';
import { setTab } from '@/store/Slices/navSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/admin/login')
  }

  const tab = useSelector((state) => state.nav.tab)
  console.log(tab)

  return (
    <nav className='flex justify-between items-center my-5'>
      <ul className='flex gap-3 font-semibold text-lg'>
        <li className='text-gray-500 hover:text-gray-900 cursor-pointer' onClick={() => dispatch(setTab('create-post'))}>Create Post</li>
        <li className='text-gray-500 hover:text-gray-900 cursor-pointer'onClick={() => dispatch(setTab('all-post'))}>All Posts</li>
      </ul>
      <Button onClick = {handleLogout}>Logout</Button>
    </nav>
  )
}

export default AdminNavbar
