import TextArea from "@atoms/TextArea"
import { RegisterOptions, useFormContext } from "react-hook-form"

interface NewRecipeProcedureProps {
    rules: Record<string, RegisterOptions>
}

const NewRecipeProcedure: React.FC<NewRecipeProcedureProps> = ({rules}) => {
  const {control} = useFormContext()
  
  return (
      <TextArea
        type='list'
        control={control}
        rules={rules}
        name='procedure'
        label='Add the procedure of your recipe.'
        minRows={15}
      />
  )
}

export default NewRecipeProcedure