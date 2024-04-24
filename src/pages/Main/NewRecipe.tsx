import Icon from '@atoms/Icon'
import ImageInput from '@atoms/ImageInput'
import TextArea from '@atoms/TextArea'
import TextField from '@atoms/TextField'
import { NewRecipeRules } from '@utils'
import clsx from 'clsx'
import useWindowDimension from 'hooks/useWindowDimension'
import React from 'react'
import { useForm } from 'react-hook-form'

type RecipePagePartsType = 'basic' | 'ingredients' | 'instructions'

const RecipeTitle = ({control}) => {
  return (
    <>
      <TextField
          control={control}
          rules={NewRecipeRules}
          name='title'
          type='text'
          placeholder='Enter the name of your Recipe.'
          label='Title'
      />
      <TextArea
          control={control}
          rules={NewRecipeRules}
          name='description'
          placeholder='Add a short description.'
          label='Description'
          minRows={3}
      />
      <ImageInput
          control={control}
          rules={NewRecipeRules}
          name='image'
          showPreview
      />
    </>
  )
}

const NavigationButtons = () => {
  const {device} = useWindowDimension()
  const handleNext = () => {}
  const handlePrevious = () => {}

  const relativeStyle = clsx({
    'fixed bottom-0 left-0 bg-white/50 backdrop-blur-sm': device === 'mobile',
  })

  const style = 'flex flex-row items-center items-center gap-4 w-full py-2 px-4 rounded-full font-bold text-lg duration-300'
  return (
    <section className={`w-full p-4 flex flex-row items-center justify-between gap-8 ${relativeStyle}`}>
      <button 
        type='button'
        className={`${style} justify-start text-black`}
        onClick={handlePrevious}
      > <Icon name='AiOutlineLeft' size={24} color='black' />Previous</button>
      <button 
        type='button'
        className={`${style} justify-end bg-primary-500 text-white hover:bg-primary-300`}
        onClick={handleNext}
      >Next<Icon name='AiOutlineRight' size={24} color='white' /></button>
    </section>
  )
}

const NewRecipe = () => {
  const [showNext, setShowNext] = React.useState(false)
  const { control } = useForm()

  const onSubmit = () => {}


  return (
    <section className='container mt-16'>
        <h1 className='text-4xl font-medium lg:text-4xl text-primary-500'>Share your beloved recipe!</h1>

        <form className='w-full md:w-2/3 lg:w-2/5 mt-8 flex flex-col gap-4 pb-24'>
            <RecipeTitle control={control} />

            
            <NavigationButtons />
        </form>
    </section>
  )
}

export default NewRecipe