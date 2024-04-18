import { Outlet } from 'react-router-dom'
import './App.css'
import Navigation from './components/organisms/Navigation'
import { Footer } from '@organisms/Footer'
import useAuth from 'hooks/useAuth'

function App() {
  const { user } = useAuth()

  return (
    <>
      <div className='w-full min-h-screen'>
        <Navigation authorized={!!user} />
        <Outlet />
      </div>
    </>
  )
}

export default App
