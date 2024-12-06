import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { login } from '@/store/Slices/authSlice'
import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'



const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async(e)  => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value

    const res = await axios.post(import.meta.env.VITE_API_URL + '/login', {
      username,password
    })

    const data = await res.data;
    dispatch(login(data.data))
    if(data.success) {
      navigate('/admin/dashboard')
      e.target.reset()
    } else {
      alert(data.message)
    }
    console.log(data)

    console.log(username,password)

    // navigate('/admin/dashboard')
    
  }


  return (
    <>
      <div className='flex justify-center' >
        <form onSubmit = {handleLogin} className='w-[50vw] max-auto grid gap-3 my-auto'>
          <Input type="text" placeholder='enter username' name='username'/>
          <Input type="password" placeholder='enter password' name='password'/>
          <Button type = 'submit'>Login</Button>
        </form>
      </div>
      <h1>Login Page is here</h1>
    </>
  )
}

export default LoginPage
