import Icon from '@atoms/Icon'
import TextField from '@atoms/TextField'
import { PersonalnformationRules } from '@utils'
import { useContext } from 'react'
import { SubmitHandler, UseFormSetValue, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { RegisterContext, RegisterContextProps } from '@contexts/RegisterContext'
import SelectionField from '@atoms/SelectionField'

enum GenderEnum {
    Male = 'm',
    Female = 'f',
    Other = 'o'
}

export type RegisterPersonalInformationInputs = {
    first_name: string,
    last_name: string,
    dob: string,
    gender: GenderEnum | null
}

const RegisterPersonalInformation = () => {
  const {registeredInfo, setRegisteredInfo} = useContext(RegisterContext) as RegisterContextProps
  const defaultValues = {
    first_name: registeredInfo.first_name,
    last_name: registeredInfo.last_name,
    dob: registeredInfo.dob,
    gender: registeredInfo.gender
  }

  const navigate = useNavigate()
  const { control, handleSubmit, formState: { errors }, setValue} = useForm<RegisterPersonalInformationInputs>({defaultValues});

  const onSubmit: SubmitHandler<RegisterPersonalInformationInputs> = data => {
    setRegisteredInfo(data);
    navigate('/signup/create-account')
  }

  return (
    <section className='w-full'>
                <form className='w-full pb-4 *:pt-4' onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        rules={PersonalnformationRules}
                        name='first_name'
                        control={control}
                        placeholder='First Name' 
                        label='First Name'
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
                        rules={PersonalnformationRules}
                        name='last_name'
                        control={control}
                        placeholder='Last Name' 
                        label='Last Name'
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
                        rules={PersonalnformationRules}
                        name='dob'
                        control={control}
                        type='date'
                        label='Date of Birth'
                    />

                    <SelectionField
                        name='gender'
                        control={control}
                        label='Gender'
                        rules={PersonalnformationRules}
                        options={Object.entries(GenderEnum)}
                        placeholder='Select your Gender'
                        setValue={setValue as UseFormSetValue<RegisterPersonalInformationInputs>}
                        defaultValue={registeredInfo.gender as string}
                    />

                    <section className='w-full p-4'>
                        <button className='cta-primary w-full mt-4' type='submit'>Continue</button>
                    </section>
                </form>
            </section>
  )
}

export default RegisterPersonalInformation