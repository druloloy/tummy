import { Input as BaseInput } from '@mui/base';
import clsx from 'clsx';
import React, { useCallback } from 'react'
import { Control, Controller, RegisterOptions, UseFormSetValue } from 'react-hook-form'
import Icon from './Icon';
import LoadingIcon from './LoadingIcon';

interface ImageInputProps {
    control: Control<any, any>;
    rules: Record<string, RegisterOptions>;
    name: string;
    showPreview?: boolean;
    setValue: UseFormSetValue<any>;
}

const ImagePreview = ({image}: {image: string}) => {
    return (
        <section className="w-full mt-4">
            <img src={image} alt="preview" className="w-full h-full object-cover aspect-video" />
        </section>
    )
}

const ImageInput: React.FC<ImageInputProps> = ({
    control,
    rules,
    name,
    setValue,
    showPreview
}) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const boxRef = React.useRef<HTMLDivElement | null>(null)

  const [imageUploading, setImageUploading] = React.useState<boolean>(false);
  const [imageBase64, setImageBase64] = React.useState<string | null>((control._formValues[name] as string) ?? null);
  const [isFileDragged, setIsFileDragged] = React.useState<boolean>(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageUploading(true)
      const file = event.target.files[0]
      const reader = new FileReader()

      reader.onload = () => {
        const result = reader.result as string
        setImageBase64(result)
        setValue(name, result)
        setImageUploading(false)
      }

      reader.readAsDataURL(file)
    }
  }

  const handleClick = () => {
    if (inputRef.current) {
        inputRef.current.click()
    }
  }

  const handleFileDragAndDrop = (event: React.DragEvent) => {
    event.preventDefault()

    if (event.dataTransfer.files) {
      setImageUploading(true)
      const file = event.dataTransfer.files[0]
      const reader = new FileReader()

      reader.onload = () => {
        const result = reader.result as string
        setImageBase64(result)
        setValue(name, result)
        setImageUploading(false)
      }

      reader.readAsDataURL(file)
      setIsFileDragged(false)
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    
    if (boxRef.current) {
        setIsFileDragged(true)
    } else {
        setIsFileDragged(false)
    }
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    if (boxRef.current) {
        setIsFileDragged(false)
    }
  }

  const clearImage = () => {
    if (inputRef.current) {
        return inputRef.current.files = null
    }
    setImageBase64(null)
    setValue(name, '')
  }

  const dragStyle = clsx({
    'bg-primary-100': isFileDragged
  })

  const error =  control.getFieldState(name)?.error

  return (
    <section className="flex flex-col">
        {showPreview && imageBase64 && <ImagePreview image={imageBase64} />}
        <Controller
            name={name}
            control={control}
            rules={rules[name]}
            render={({ field }) => 
                imageBase64 ? (
                    <button 
                        type="button"
                        className="w-full justify-center flex items-center gap-2 mt-4 border border-primary-300 rounded-xl py-4 text-primary-500 hover:bg-primary-100"
                        onClick={clearImage}>
                            <Icon name="AiOutlineDelete" size={24} color="primary-500" /> Remove Image
                    </button>
                ) : (
                    <section 
                        ref={boxRef}
                        onClick={handleClick}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleFileDragAndDrop}
                        className={`w-full h-36 p-8 flex flex-col justify-center items-center px-2 border-2 border-primary-300 border-dashed hover:cursor-pointer hover:bg-primary-100 ${dragStyle}`}>
                            <BaseInput
                                {...field}
                                type="file"
                                slotProps={{ 
                                    input: {
                                        ref: (element) => {
                                            inputRef.current = element
                                        },
                                        className: 'hidden',
                                        accept: 'image/jpeg, image/png, image/jpg',
                                        onChange: handleImageUpload
                                    }
                                }}
                            />
                            {
                                !imageUploading ? (
                                    <>
                                        <Icon name="AiOutlineCloudUpload" size={32} color="primary-500" />
                                        <p className='text-lg text-primary-500'>Drop the photo or click to upload,</p>
                                    </>
                                ) : (
                                    <LoadingIcon size={8} text='Uploading...'/>
                                )
                            }
                    </section>
                )
            }
        />
        {error && <p className='text-red-500'>{error.message}</p>}
    </section>
  )
}

export default ImageInput