import { Link, Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import Header from './components/organisms/Header'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { useContext, useEffect, useMemo } from 'react'
import { app } from '@fb/app'
import useAuth from 'hooks/useAuth'
import { AuthContext, AuthContextProps } from '@contexts/AuthContext'
import { Footer } from '@organisms/Footer'

function App() {
  const { user, isEmailVerified, isLoading } = useContext(AuthContext) as AuthContextProps

  return (
    <>
      <div className='w-full min-h-screen'>
        <Header authorized={!!user} />
        <Outlet />
        <Footer authorized={!!user} />
      </div>
    </>
  )
}

export default App
