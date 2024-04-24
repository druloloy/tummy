import React, { useContext, useEffect } from 'react'
import TextField from '@atoms/TextField'
import Icon from '@atoms/Icon'
import clsx from 'clsx'
import { useForm, SubmitHandler } from 'react-hook-form'
import { RegisterAccountFormRules } from '@utils'
import { RegisterContext, RegisterContextProps } from '@contexts/RegisterContext'
import { signupUser } from '@fb/app'
import { useNavigate } from 'react-router-dom'
import useAuth from 'hooks/useAuth'
import { UserAPI } from 'services/api'
import { FirebaseErrors } from 'utils/errors'

type RegisterInputs = {
    email: string,
    username: string,
    password: string,
    confirmPassword: string
}

const defaultValues = {
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
}

const RegisterCredentials = () => {
    const navigate = useNavigate()
    const {signup, deleteUser} = useAuth()
    const { registeredInfo } = useContext(RegisterContext) as RegisterContextProps

    const [passwordVisible, setPasswordVisible] = React.useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState(false)
    const { control, handleSubmit, formState: { errors, isDirty }, setError, watch} = useForm<RegisterInputs>({defaultValues, mode: 'onChange'});

    const onSubmit: SubmitHandler<RegisterInputs> = async ({email, password, username}, event) => {
        try {
            await signup({email, password, username, ...registeredInfo} as RegisterUserType)
            .then(() => {
                navigate('/verify')
            })
        }
        catch (error) {
            console.log(error)
            setError('root.api', { type: 'custom', message: FirebaseErrors[error?.code] || error?.code })
        }

    };
    const toggleVisibility = (state: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>) => {
        setState(!state)
    }

  return (
            <section className='w-full'>
                <form className='w-full pb-4 *:pt-4' onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        rules={RegisterAccountFormRules}
                        name='username'
                        control={control}
                        placeholder='Username' 
                        label='Username'
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
                        rules={RegisterAccountFormRules}
                        name='email'
                        control={control}
                        placeholder='Email' 
                        label='Email'
                        type='email'
                        LeadingIcon={
                            <Icon 
                                name='AiOutlineMail'
                                size={24}   
                                color='primary-700'
                            />
                        }
                    />
                    <TextField
                        rules={RegisterAccountFormRules}
                        name='password'
                        control={control}
                        placeholder='Password' 
                        label='Password'
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
                    <TextField
                        rules={RegisterAccountFormRules}
                        name='confirmPassword'
                        control={control}
                        placeholder='Confirm Password' 
                        label='Confirm Password'
                        type={confirmPasswordVisible ? 'text' : 'password'}
                        LeadingIcon={
                            <Icon
                                name='AiOutlineLock'
                                size={24}
                                color='primary-700'
                            />
                        }
                        TrailingIcon={
                            <Icon 
                                name={clsx({ 'AiOutlineEyeInvisible': !confirmPasswordVisible, 'AiOutlineEye': confirmPasswordVisible })}
                                size={24} 
                                color='primary-700'
                                onClick={() => toggleVisibility(confirmPasswordVisible, setConfirmPasswordVisible)}
                            />
                        }
                    />
                    
                    <section className='w-full p-4'>
                        <p className='text-sm text-primary-700'>{errors.root?.api?.message}</p>
                        <button className='cta-primary w-full mt-4' type='submit'>Create an account</button>                        
                    </section>
                </form>
            </section>
  )
}

export default RegisterCredentials