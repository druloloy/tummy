import ImageInput from "@atoms/ImageInput"
import TextArea from "@atoms/TextArea"
import TextField from "@atoms/TextField"
import { RegisterOptions, useFormContext } from "react-hook-form"

interface NewRecipeBasicProps {
    rules: Record<string, RegisterOptions>
}

const NewRecipeBasic: React.FC<NewRecipeBasicProps> = ({rules}) => {
  const { control, setValue, formState: {errors} } = useFormContext()

  return (
    <>
      <section>
            <h2 className='text-3xl font-medium lg:text-4xl text-primary-500'>Share your beloved recipe!</h2>
            <p className='text-lg font-medium lg:text-lg text-primary-500'>We love to cook and share our recipes with others. So, let's get started!</p>
      </section>
      <section className='w-full flex flex-col gap-2'>
        <ImageInput
            control={control}
            rules={rules}
            name='image'
            setValue={setValue}
            showPreview
        />
        <TextField
            control={control}
            rules={rules}
            name='title'
            type='text'
            placeholder='Enter the name of your recipe.'
            label='Title'
        />
        <TextArea
            type='limited'
            control={control}
            rules={rules}
            name='description'
            placeholder='Add a short description.'
            label='Description'
            minRows={3}
        />
      </section>
    </>
  )
}

export default NewRecipeBasic