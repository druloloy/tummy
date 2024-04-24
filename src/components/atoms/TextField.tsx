import React from 'react';
import { Input as BaseInput, InputProps } from '@mui/base/Input';
import clsx from 'clsx';
import { Controller, Control, RegisterOptions } from 'react-hook-form';

interface TextFieldProps extends Omit<InputProps, 'type' | 'startAdornment' | 'endAdornment'> {
  name: string;
  type?: 'number' | 'text' | 'email' | 'password' | 'date';
  label?: string;
  placeholder?: string;
  TrailingIcon?: React.ReactElement;
  LeadingIcon?: React.ReactElement;
  control: Control<any>;
  rules: Record<string, RegisterOptions>;
}


const TextField: React.FC<TextFieldProps> = ({
    name, 
    control, 
    label, 
    type, 
    placeholder, 
    TrailingIcon, 
    LeadingIcon, 
    rules
  }) => {

  const inputStyle = clsx({
    'border-primary-300 outline-secondary-300': !control._formState.errors[name]?.message,
    'border-primary-700 outline-primary-700': control._formState.errors[name]?.message,
  });

  const error = control.getFieldState(name)?.error

  return (
    <section className="flex flex-col text-left px-2">
      <Controller
        name={name}
        control={control}
        rules={rules[name]}
        render={({ field }) => (
          <section className="flex flex-col text-left px-2">
            {label && <p className="text-sm text-black px-2 font-normal">{label}</p>}
            <BaseInput
              {...field}
              type={type}
              slotProps={{
                input: {
                  className: `flex-1 pl-2 text-black outline-0 bg-transparent md:text-lg autofill:bg-transparent placeholder:text-primary-400`,
                },
                root: {
                  className: `w-full flex flex-row items-center px-4 py-2 bg-white border border-primary-300 outline-1 rounded-full hover:bg-primary-50 ${inputStyle}`,
                }
              }}
              placeholder={placeholder}
              startAdornment={LeadingIcon}
              endAdornment={TrailingIcon}
            />
            <p className="text-sm text-primary-700">{error && error?.message}</p>
          </section>
        )}
      />
    </section>
  )
}

export default TextField;