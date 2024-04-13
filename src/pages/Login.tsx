import React from 'react'
import TextField from '@atoms/TextField'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginFormRules } from '@utils'
import Icon from '@atoms/Icon'
import clsx from 'clsx'
import HighlightText from '@atoms/HighlightText'
import useAuth from 'hooks/useAuth'
import { Navigate, useNavigate } from 'react-router-dom'
import { FirebaseErrors } from 'utils/errors'


type LoginInputs = {
    email: string,
    password: string
}

const defaultValues = {
    email: '',
    password: ''
}


function Login() {
  const {login} = useAuth()
  const navigate = useNavigate()
  const [passwordVisible, setPasswordVisible] = React.useState(false)
  const { control, handleSubmit, formState: { errors }, setError} = useForm<LoginInputs>({defaultValues});

  const toggleVisibility = (state: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>) => {
      setState(!state)
  }

  const onSubmit: SubmitHandler<LoginInputs> = async ({email, password}) => {
    await login(email, password)
        .then(() => navigate('/'))
        .catch((error) => {
            setError('root.api', { type: 'custom', message: FirebaseErrors[error?.code] || error?.code })
        })
  };

  return (
    <section className='container'>
        <section className='w-full md:w-2/3 lg:w-1/3 mt-8 mx-auto'>
            <h2 className='text-5xl md:text-6xl font-medium'>
                <HighlightText color='primary-500' weight='bold'>Howdy, </HighlightText> my gorgeous friend!</h2>
            <h3 className='text-3xl md:text-4xl font-medium mt-4'>Login to your account.</h3>
            <section className='w-full'>
                <form className='w-full pb-4' onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        rules={LoginFormRules}
                        name='email'
                        control={control}
                        placeholder='Email' 
                        type='text'
                        LeadingIcon={
                            <Icon
                                name='AiOutlineUser'
                                size={24}
                                color='primary-700'
                            />
                        }
                    />
                    <TextField
                        rules={LoginFormRules}
                        name='password'
                        control={control}
                        placeholder='Password' 
                        type={passwordVisible ? 'text' : 'password'}
                        LeadingIcon={
                            <Icon
                                name='AiOutlineLock'
                                size={24}
                                color='primary-700'
                            />
                        }
                        TrailingIcon={
                            <Icon 
                                name={clsx({ 'AiOutlineEyeInvisible': !passwordVisible, 'AiOutlineEye': passwordVisible })}
                                size={24} 
                                color='primary-700' 
                                onClick={() => toggleVisibility(passwordVisible, setPasswordVisible)}
                            />
                        }
                    />
                    <section className='w-full p-4'>
                        <p className='text-sm text-primary-700'>{errors.root?.api?.message}</p>
                        <button className='cta-primary w-full mt-4' type='submit'>Login</button>
                    </section>
                </form>
            </section>
        </section>
    </section>
  )
}

export default Login