import React from 'react'
import {Select as BaseSelect, SelectProps, SelectRootSlotProps} from '@mui/base/Select'
import {Option as BaseOption, OptionOwnerState, OptionProps} from '@mui/base/Option'
import { Controller, RegisterOptions, UseFormSetValue, Control } from 'react-hook-form'
import Icon from './Icon';
import clsx from 'clsx';
import { useTheme } from '@mui/system';

interface SelectionFieldProps<T extends Map<string, any>> {
    name: string;
    control: Control<any, any>;
    label?: string;
    rules: Record<string, RegisterOptions>;
    options: [T, string][];
    defaultValue?: string;
    placeholder: string;
    setValue: UseFormSetValue<T>
}

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === 'function' ? fn(args) : fn;

const getOptionColorClasses = ({
  selected,
  highlighted,
  disabled,
}: Partial<OptionOwnerState<number | string>>) => {
  let classes = '';
  if (disabled) {
    classes += ' text-primary-300';
  } else {
    if (selected) {
      classes +=
        ' bg-primary-300 text-black';
    } else if (highlighted) {
      classes +=
        ' bg-primary-100 text-primary-900';
    }
    classes +=
      ' hover:bg-primary-300 hover:text-primary-900';
    classes +=
      ' focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-400';
  }
  return classes;
};

const Option = React.forwardRef<HTMLLIElement, OptionProps<number | string>>((props, ref) => {
  return (
    <BaseOption
      ref={ref}
      {...props}
      slotProps={{
        root: ({ selected, highlighted, disabled }) => ({
          className: `list-none p-2 rounded-md cursor-default last-of-type:border-b-0 ${getOptionColorClasses(
            { selected, highlighted, disabled },
          )}`,
        }),
      }}
    />
  );
});

const Button = React.forwardRef(function Button<
  TValue extends {},
  Multiple extends boolean,
>(
  props: SelectRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const { ownerState, ...other } = props;
  return (
    <button type="button" {...other} ref={ref}>
      {other.children}
      <Icon name='AiFillCaretDown' size={16} color='primary-700' />
    </button>
  );
});

const Select = React.forwardRef(function CustomSelect<
  TValue extends {},
  Multiple extends boolean,
>(props: SelectProps<TValue, Multiple>, ref: React.ForwardedRef<HTMLButtonElement>) {
  // Replace this with your app logic for determining dark modes
  const isDarkMode = useIsDarkMode();

  return (
    <BaseSelect
      ref={ref}
      {...props}
      className={clsx('CustomSelect', props.className)}
      slots={{
        root: Button,
      }}
      slotProps={{
        ...props.slotProps,
        root: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `relative text-md font-sans box-border w-full px-4 py-2 rounded-full text-left bg-white border border-solid border-primary-300 text-black hover:bg-primary-50 transition-all outline-0 shadow-md shadow-slate-100 ${
                ownerState.focusVisible
                  ? 'focus-visible:ring-4 ring-primary-500/30 focus-visible:border-primary-500'
                  : ''
              } [&>svg]:text-base	[&>svg]:absolute [&>svg]:h-full [&>svg]:top-0 [&>svg]:right-2.5`,
              resolvedSlotProps?.className,
            ),
          };
        },
        listbox: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.listbox,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `text-md font-sans p-1.5 my-3 w-80 rounded-lg overflow-auto outline-0 bg-white border border-solid border-primary-300 text-black`,
              resolvedSlotProps?.className,
            ),
          };
        },
        popup: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.popup,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `${isDarkMode ? 'dark' : ''} z-10`,
              resolvedSlotProps?.className,
            ),
          };
        },
      }}
    />
  );
});

const SelectionField: React.FC<SelectionFieldProps<any>> = ({
    name,
    control,
    label,
    rules,
    options,
    defaultValue,
    placeholder,
    setValue
}) => {

  return (
    <section className="flex flex-col text-left pt-4 px-2">
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={ ({ field: { name, ref } }) => (
                <section className="flex flex-col text-left px-2">
                    {label && <p className="text-md text-black px-2 font-normal">{label}</p>}
                    <Select 
                        ref={ref}
                        name={name}
                        defaultValue={defaultValue || ''}
                        onChange={
                            (event) => {
                                const matchedPair = options.find(([key]) => key == (event?.target as HTMLInputElement).textContent as string)
                                setValue(
                                    name,
                                    (matchedPair && (matchedPair[1] as string)) || null
                                )
                            }
                        }
                        >
                            <Option value="" disabled>{placeholder}</Option>
                            {
                                options.map(([key, value]) => (
                                    <Option key={value as string} value={value as string}>
                                        {key as string}
                                    </Option>
                                ))
                            }
                    </Select>
                    <p className="text-md text-primary-700"></p>
                </section>
            )}
        />
    </section>
  )
}

export default SelectionField