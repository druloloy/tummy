import { TextareaAutosize, TextareaAutosizeProps } from '@mui/base';
import clsx from 'clsx';
import React, { useMemo } from 'react'
import { Control, Controller, RegisterOptions, ValidationValueMessage } from 'react-hook-form';


interface TextArea extends Omit<TextareaAutosizeProps, 'placeholder' | 'name' | 'maxLength'> {
    type: 'limited' | 'list';
    name: string;
    control: Control<any, any>;
    rules: Record<string, RegisterOptions>;
    label?: string;
    placeholder?: string;
}

const TextArea: React.FC<TextArea> = ({
    type,
    name, 
    control, 
    label, 
    placeholder,
    rules,
    ...props
}) => {
  const [currentLength, setCurrentLength] = React.useState(0)
  const [value, setValue] = React.useState('')

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    switch(type) {
      case 'limited': 
        setCurrentLength(value.length)
        break;
      case 'list': {
        const lines = value.split('\n')
        const regexp = /^\d+\.\).*/

        const linesWithIndex = lines.map((line, index) => {
          if (!new RegExp(regexp).test(line)) {
            line = `${index + 1}.) ${line}`
            
            return line
          }

          if (new RegExp(/^\d+\.\)$/).test(line)) {
            return ''
          }

          return line
        })
        .flat()
        .join('\n')

        event.target.value = linesWithIndex
        setValue(linesWithIndex)
        break
      }
      default:
        break
    }
  }


  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const lastLine = value.split('\n').at(-1)
    if (event.key === 'Enter' && new RegExp(/^\d+\.\)\s+$/).test(lastLine ?? '')) {
      return event.preventDefault()
    }
  }

  const maxLength = useMemo(() => 
      Number(rules?.[name]?.maxLength) ||
      (rules?.[name]?.maxLength as ValidationValueMessage<number>)?.value ||
      -1, 
    [rules, name])

  const overLimitStyle = clsx({
    'text-black/60': currentLength > maxLength && maxLength > 0
  })

  const error = control.getFieldState(name)?.error

  return (
    <section className="flex flex-col text-left">
        <Controller
          name={name}
          control={control}
          rules={rules[name]}
          render={({ field }) => (
              <section className="flex flex-col text-left">
                  {label && <p className="text-sm text-black px-2 font-normal">{label}</p>}
                  <section className='relative flex flex-col items-center px-4 py-2 pb-4 bg-white border border-primary-300 outline-1 rounded-xl hover:bg-primary-50'>
                      <TextareaAutosize
                          {...field}
                          onChange={(event)=>{
                              handleTextAreaChange(event)
                              field.onChange(event)
                          }}
                          placeholder={placeholder}
                          className={`w-full text-black outline-0 bg-transparent md:text-lg autofill:bg-transparent placeholder:text-primary-400 ${overLimitStyle}`}
                          onKeyDown={handleKeyDown}
                          {...props}
                      />

                      {
                          maxLength > 0 && <p className={`absolute bottom-0 right-2 text-sm ${overLimitStyle} `}>{currentLength}/{maxLength}</p>
                      }

                  </section>
                  {error && <p className="text-sm text-red-500 px-2">{error.message}</p>}
              </section>
          )}
        />
    </section>
  )
}

export default TextArea