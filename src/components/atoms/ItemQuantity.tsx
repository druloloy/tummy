import Icon from '@atoms/Icon'
import { Control, Controller, RegisterOptions } from 'react-hook-form'

interface ItemQuantityProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  name: string
  control: Control
  rules: Record<string, RegisterOptions>
}
const ItemQuantity: React.FC<ItemQuantityProps> = ({
    name, 
    value, 
    setValue,
    control,
    rules
  }) => {
  const remove = () => {
    if (Number(value) <= 1) return
    setValue((val) => (Number(val) - 1).toString())
  }

  const add = () => {
    if(value.length > 6) return
    setValue((val) => (Number(val) + 1).toString())
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    const decimalPattern = '^[0-9]+(\.[0-9]*)?$'

    if (!new RegExp(decimalPattern).test(value)) return
    if (!value) return setValue('1')

    if (value.length > 6) return
    
    setValue(value)
  }

  return (
    <section className='flex flex-row items-center justify-end px-4'>
      <button
          type='button'
          className='w-6 h-6 flex items-center justify-center border border-primary-500 rounded-full'
          onClick={remove}
      >
        <Icon name='AiOutlineMinus' size={16} color='primary-500' />
      </button>

      <section className='flex items-center justify-center'>
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({field}) => (
                <input
                  {...field}
                  type='text'
                  pattern='[0-9]*'
                  maxLength={6}
                  inputMode='decimal'
                  className='w-16 text-center'
                  value={value}
                  onChange={onChange}
                />
            )}
        />
      </section>

      <button
          type='button'
          className='w-6 h-6 flex items-center justify-center border border-primary-500 rounded-full'
          onClick={add}
      >
        <Icon name='AiOutlinePlus' size={16} color='primary-500' />
      </button>
    </section>
  )
}

export default ItemQuantity