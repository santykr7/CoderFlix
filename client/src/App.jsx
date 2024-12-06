import { useState } from 'react'
import {Button} from './components/ui/button'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './pages/Homepage'
import { Home } from 'lucide-react'
import Navbar from './customes/Navbar'
import Footer from './customes/Footer'
import LoginPage from './pages/loginPage'
import AdminNavbar from './customes/AdminNavbar'
import Dashboard from './pages/Dashboard'
import { Provider } from 'react-redux'
import {store} from './store/store'
import { Toaster } from "@/components/ui/toaster"
import Moviedetails from './pages/Moviedetails'
import ProtectedRoute from './customes/ProtectedRoute'

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: '/',
      element:(
        <>
          <Navbar />
          <Homepage />
          <Footer />
        </>
      )
    },
    {
      path: '/admin/login',
      element:(
        <>
          <LoginPage />
          <Footer />
        </>
      )
    },
    {
      path: '/admin/dashboard',
      element:(
        <>
        <ProtectedRoute>
          <AdminNavbar />
          <Dashboard />
        </ProtectedRoute>
        </>
      )
    },
    {
      path: '/movie/:title',
      element:(
        <>
          <Moviedetails />
          <Footer />
        </>
      )
    },
  ])

  return (
    <>
      <Provider store = {store}>
        <Toaster swipeDirection="right"/>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App
