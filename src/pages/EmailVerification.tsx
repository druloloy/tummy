import React from 'react'
import VerificationImage from '../assets/images/undraw_verified_re_4io7.svg'
import HighlightText from '@atoms/HighlightText'
import useAuth from 'hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from 'hooks/useLocalStorage'
const EmailVerification = () => {
  const navigate = useNavigate()
  const { user, sendVerificationEmail } = useAuth()
  const { set, watch } = useLocalStorage()
  watch(1000)

  set('user', user, 2000)

  React.useEffect(() => {
    if (user?.emailVerified) {
      navigate('/')
    }
  }, [user])

  const verifyAgain = () => {
    sendVerificationEmail()
      .then(() => {
        console.log('sent')
      })
  }
  return (
    <section className='container mt-8'>
        <section className='w-full md:w-2/3 lg:w-1/3 mx-auto text-center'>
            <img className='w-52 mx-auto mt-8' src={VerificationImage} />
            <h2 className='text-5xl md:text-6xl font-medium'><HighlightText color='primary-500' weight='regular'>Almost there!</HighlightText></h2>
            <p className='text-xl md:text-2xl font-normal mt-4 text-pretty'>Click on the link we sent to this email: <HighlightText color='primary-500' weight='medium'>{user?.email}</HighlightText> to continue.</p>
            <button onClick={verifyAgain} className='bg-primary-500 text-white px-6 py-2 rounded-full mt-4'>Resend Verification Email</button>
        </section>
    </section>
  )
}
    
export default EmailVerification