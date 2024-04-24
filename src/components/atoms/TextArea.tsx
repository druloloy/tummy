import { TextareaAutosize, TextareaAutosizeProps } from '@mui/base';
import clsx from 'clsx';
import React, { useMemo } from 'react'
import { Control, Controller, RegisterOptions } from 'react-hook-form';

interface TextArea extends Omit<TextareaAutosizeProps, 'placeholder' | 'name' | 'maxLength'> {
    name: string;
    control: Control<any>;
    rules: Record<string, RegisterOptions>;
    label?: string;
    placeholder?: string;
}

const TextArea: React.FC<TextArea> = ({
    name, 
    control, 
    label, 
    placeholder,
    rules,
    ...props
}) => {

  const [currentLength, setCurrentLength] = React.useState(0)
  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentLength(event.target.value.length)
  }

  const maxLength = useMemo(() => Number(rules?.[name]?.maxLength) || -1, [rules, name])

  const overLimitStyle = clsx({
    'text-black/60': currentLength > maxLength,
    'text-black': currentLength <= maxLength
  })

  return (
    <section className="flex flex-col text-left px-2">
        <Controller
        name={name}
        control={control}
        rules={rules[name]}
        render={({ field }) => (
            <section className="flex flex-col text-left px-2">
                {label && <p className="text-sm text-black px-2 font-normal">{label}</p>}
                <section className='relative flex flex-col items-center px-4 py-2 pb-4 bg-white border border-primary-300 outline-1 rounded-xl hover:bg-primary-50'>
                    <TextareaAutosize
                        {...field}
                        onChange={handleTextAreaChange}
                        placeholder={placeholder}
                        className={`w-full pl-2 text-black outline-0 bg-transparent md:text-lg autofill:bg-transparent placeholder:text-primary-400 ${overLimitStyle}`}
                        {...props}
                    />

                    {
                        maxLength > 0 && <p className={`absolute bottom-0 right-2 text-sm ${overLimitStyle} `}>{currentLength}/{maxLength}</p>
                    }

                </section>
            </section>
        )}
        />
    </section>
  )
}

export default TextArea