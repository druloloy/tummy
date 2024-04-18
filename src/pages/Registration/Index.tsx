import HighlightText from '@atoms/HighlightText'
import { getCurrentUser } from '@fb/app'
import RegisterProvider from '@providers/RegisterProvider'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Registration: React.FC = () => {

  const [user, setUser] = React.useState<string | null>(null)

  const isUserLoggedIn = () => {
    getCurrentUser((user) => {
        if (user) {
            setUser(user.email) 
        }
    })

    return !!user
  }

  return (
    <section className='container mt-28'>
        <section className='w-full md:w-2/3 lg:w-1/3 mt-8 mx-auto'>
            <h2 className='text-5xl md:text-6xl font-medium'>Start your <HighlightText color='primary-500' weight='semibold'>cravings</HighlightText> with us!</h2>
            <h3 className='text-3xl md:text-4xl font-medium mt-4'>Create an account. <HighlightText color='primary-500' weight='semibold'> It's free</HighlightText>!</h3>

            <RegisterProvider>
                <Outlet />
            </RegisterProvider>
        
        </section>
    </section>
  )
}

export default Registration