import Icon from '@atoms/Icon'
import LoadingIcon from '@atoms/LoadingIcon'
import NewRecipeBasic from '@molecules/NewRecipeBasic'
import NewRecipeIngredients from '@molecules/NewRecipeIngredients'
import NewRecipeProcedure from '@molecules/NewRecipeProcedure'
import SlideNavigation from '@molecules/SlideNavigation'
import ResultModal from '@organisms/ResultModal'
import { NewRecipeRules } from '@utils'
import useAuth from 'hooks/useAuth'
import { useCallback, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ImageAPI, RecipeAPI } from 'services/api'
import {v4 as uuid} from 'uuid'

type RecipeInputs = {
  title: string,
  description: string,
  image: string,
  procedure: string,
  ingredientInput: string,
  ingredients: Array<string>
}

const defaultValues = {
  title: '',
  description: '',
  image: '',
  procedure: '1.) ',
  ingredientInput: '',
  ingredients: []
}

type RecipeInputKeys = keyof RecipeInputs

const NewRecipe = () => {
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [showModal, setShowModal] = useState<[boolean, 'success' | 'error']>([false, 'error'])
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const _id = useMemo(() => uuid(), [])
  const navigate = useNavigate()

  const methods = useForm<RecipeInputs>({
    defaultValues,
    mode: 'all',
    shouldFocusError: true
  })

  const onSubmit = async (data: Omit<RecipeInputs, 'ingredientInput'>) => {
    try {
      setIsSubmitting(true)
      const token = await user?.getIdToken();

      if (!token) {
        throw new Error('No token found')
      }

      ImageAPI.uploadImage(data.image, _id)
        .then((imageURL) => {

          if(!imageURL) {
            throw new Error('Image is not uploaded.')
          }

          const recipe: Omit<Recipe, 'created_at' | 'owner_id'> = {
            _id,
            image_url: imageURL,
            title: data.title,
            ingredients: data.ingredients,
            description: data.description,
            procedure: data.procedure
          }

          RecipeAPI.createRecipe(recipe, token)
            .then(() => {
              setShowModal([true, 'success'])
            })
        })
        .catch((error) => {
          setShowModal([true, 'error'])
          console.log(error)
        })
        .finally(() => setIsSubmitting(false))

    } catch (error) {
      console.log(error)
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <NewRecipeBasic 
                rules={NewRecipeRules} />
      case 2:
        return <NewRecipeIngredients
                rules={NewRecipeRules} />
      case 3:
        return <NewRecipeProcedure
                rules={NewRecipeRules} />
      case 4:
        return <></>
      default:
        return <NewRecipeBasic rules={NewRecipeRules} />
    }
  }

  const handleTrigger = useCallback(
    async (...args: RecipeInputKeys[]) => await Promise.all(args.map(arg => methods.trigger(arg))),
    [methods]
  )

  const navigationSteps = async (currentStep: number) => {
    if (currentStep === 1) {
      const result: Array<boolean> = await handleTrigger('title', 'description', 'image')
      if (result.some(passed => !passed)) return false
    }

    if (currentStep === 2) {
      const result: Array<boolean> = await handleTrigger('ingredients')
      if (result.some(passed => !passed)) return false
    }

    if (currentStep === 3) {
      const result: Array<boolean> = await handleTrigger('procedure')
      if (result.some(passed => !passed)) return false
    }

    return true
  }

  return (
    <>
      
      <FormProvider {...methods}>
        <section className='container mt-16 md:flex md:flex-col md:items-center'>
            <form 
              onSubmit={methods.handleSubmit(onSubmit)}
              className='w-full md:w-2/3 lg:w-2/5 flex flex-col gap-8 pb-24'>
                
                {renderStep()}

                <SlideNavigation
                  stepFunctions={navigationSteps}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  PreviousButton={
                    ({onClick, twStyle}) => (
                      <button 
                        type='button'
                        className={`${twStyle} w-fit justify-start text-black`}
                        onClick={onClick}
                      > <Icon name='AiOutlineLeft' size={24} color='black' /></button>
                    )
                  }
                  NextButton={
                    ({onClick, twStyle}) => currentStep === 3 ? (
                      <button 
                        type='submit'
                        className={`${twStyle} flex-[2] justify-end bg-primary-600 text-white hover:bg-primary-300`}
                        >
                        Post Recipe{ isSubmitting ? <LoadingIcon size={6} /> : <Icon name='AiOutlineRight' size={24} color='white' /> }
                        </button>
                      ) : (
                      <button 
                        type='button'
                        className={`${twStyle} flex-[2] justify-end bg-primary-500 text-white hover:bg-primary-300`}
                        onClick={onClick}
                      >Continue<Icon name='AiOutlineRight' size={24} color='white' /></button>
                    )
                  }
                  maxStep={3}
                  scrollToTop
                />
            </form>
        </section>
      </FormProvider>
      <ResultModal
        type={showModal[1]}
        message={showModal[1] === 'success' ? 'Recipe created successfully' : 'Failed to create recipe. Check you inputs and try again.'}
        open={showModal[0]} 
        close={() => {
          setShowModal([false, showModal[1]])
          setTimeout(() => navigate('/'), 1000)
        }}
      />
    </>
  )
}

export default NewRecipe