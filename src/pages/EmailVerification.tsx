import React from 'react'
import VerificationImage from '../assets/images/undraw_verified_re_4io7.svg'
import HighlightText from '@atoms/HighlightText'
import useAuth from 'hooks/useAuth'
import { Navigate } from 'react-router-dom'
import useLocalStorage from 'hooks/useLocalStorage'
const EmailVerification = () => {
  const { user } = useAuth()
  const { get, set, remove, watch } = useLocalStorage()

  watch(5000)

  set('user', user, 2000)

  return (
    <section className='container'>
        <section className='w-full md:w-2/3 lg:w-1/3 mt-8 mx-auto text-center'>
            <img className='w-52 mx-auto mt-8' src={VerificationImage} />
            <h2 className='text-5xl md:text-6xl font-medium'><HighlightText color='primary-500' weight='regular'>Almost there!</HighlightText></h2>
            <p className='text-xl md:text-2xl font-normal mt-4 text-pretty'>Click on the link we sent to this email: <HighlightText color='primary-500' weight='medium'>{user?.email}</HighlightText> to continue.</p>
        </section>
    </section>
  )
}
    
export default EmailVerification