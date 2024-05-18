import Icon from "@atoms/Icon"
import TextField from "@atoms/TextField"
import { TextareaAutosize } from "@mui/base"
import { useEffect } from "react"
import { 
        FieldValues, 
        RegisterOptions, 
        UseFormRegister, 
        useFieldArray, 
        useFormContext
    } from "react-hook-form"

interface RecipeItemProps {
  removeItem: () => void
  name: string
  register: UseFormRegister<FieldValues>
}

interface NewRecipeIngredientsProps {
  rules: Record<string, RegisterOptions>
}

const RecipeItem: React.FC<RecipeItemProps> = ({
  removeItem,
  name,
  register
}) => {
    return (
      <section
        className='relative w-full'>
          <section className='w-full flex flex-col items-center justify-end gap-2 border border-primary-500 p-4 rounded-lg'>
            <section className='w-full flex flex-row items-start justify-between'>
              <TextareaAutosize 
                {...register(name)}
                className='w-full h-auto flex-1 text-md font-medium text-primary-500 text-wrap disabled:bg-transparent'
                disabled
              />
            </section>
          </section>

          <section className='absolute -right-2 -top-2'>
            <button type='button' className='p-1 flex items-center justify-center font-black bg-red-500 rounded-full'>
              <Icon
                name='AiOutlineClose'
                size={16}
                color='white'
                onClick={()=>removeItem()}
              />
            </button>
          </section>
      </section>
    )
}

const NewRecipeIngredients: React.FC<NewRecipeIngredientsProps> = ({
    rules
}) => {
  const {control, register, reset, getValues, clearErrors} = useFormContext()

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'ingredients',
    rules: rules['ingredients'],
  })

  const addItem = () => {
    const value: string = getValues('ingredientInput')
    if (!value) return

    append(value)
  }

  const clearItemInput = () => {
    reset({ingredientInput: ''})
  }

  const removeItem = (index: number) => {
    remove(index)
  }

  useEffect(() => {
    fields.length > 0 && clearErrors('ingredients')
  }, [fields])

  const error = control.getFieldState('ingredients').error
  return (
    <section className='w-full flex flex-col gap-2'>  
      <TextField
          control={control}
          rules={rules}
          name='ingredientInput'
          type='text'
          placeholder='1 cup olive oil'
          label='Add the ingredients of your recipe.'
          TrailingIcon={
            <span className='cursor-pointer'>
              <Icon
                onClick={clearItemInput}
                name='AiOutlineClose' 
                size={24} 
                color='primary-500' 
              />
            </span>
          }
        />
      
      <button 
        className='bg-primary-500 py-2 text-white rounded-full font-medium text-lg duration-300 hover:bg-primary-300' 
        onClick={addItem}
        type='button'>
          Add Ingredient
      </button>

      <section className='mt-2 flex flex-col items-start gap-2'>
        {
          fields.length > 0 ? 
          fields.map((item, index) => (
            <RecipeItem
              key={item.id}
              removeItem={() => removeItem(index)}
              register={register}
              name={`ingredients.${index}`}
            />
          )) :
          <section className='text-lg text-black font-medium text-center w-full border-2 border-primary-500 border-dashed p-8'>
            <p>No ingredients added.</p>
          </section>
        }
      </section>
        {error && <p className='text-red-500'>{error.root?.message}</p>}
    </section>
  )
}

export default NewRecipeIngredients