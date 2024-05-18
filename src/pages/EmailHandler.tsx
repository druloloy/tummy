import { Auth, applyActionCode } from '@firebase/auth';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const EmailHandler = () => {
  const {state: {oobCode, mode}} = useLocation()
  const [message, setMessage] = useState('');
  const {user, auth} = useAuth();

  const handleEmailVerification = async (auth: Auth, actionCode: string) => {
    return await applyActionCode(auth, actionCode)
  }

    if (user) {
        switch (mode) {
            case 'verifyEmail': {
                handleEmailVerification(auth, oobCode)
                    .then(() => {
                        setMessage('Email Verified')
                        
                        setTimeout(() => {
                            window.close()
                        }, 3000)
                    })
                    .catch((error) => {
                        setMessage('Verification Link Expired.')
                        throw error
                    })
                break;
            }
        }
    }

  return (
    <section className='w-full h-full flex flex-col justify-center items-center'>
      <h2 className='text-xl font-medium lg:text-2xl text-primary-500'>{message}</h2>
    </section>
  )
}

export default EmailHandler