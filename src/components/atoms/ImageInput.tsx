import { Input as BaseInput } from '@mui/base';
import clsx from 'clsx';
import React from 'react'
import { Control, Controller, RegisterOptions } from 'react-hook-form'
import Icon from './Icon';
import LoadingIcon from './LoadingIcon';

interface ImageInputProps {
    control: Control;
    rules: Record<string, RegisterOptions>;
    name: string;
    showPreview?: boolean;
}

const ImagePreview = ({image}) => {
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
    showPreview
}) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const boxRef = React.useRef<HTMLSectionElement | null>(null)

  const [imageUploading, setImageUploading] = React.useState<boolean>(false);
  const [imageBase64, setImageBase64] = React.useState<string | null>(null);
  const [isFileDragged, setIsFileDragged] = React.useState<boolean>(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    
    if (event.target.files) {
      setImageUploading(true)
      const file = event.target.files[0]
      const reader = new FileReader()

      reader.onload = () => {
        setImageBase64(reader.result as string)
        setImageUploading(false)
      }

      reader.readAsDataURL(file)
    }

  }

  const handleClick = (event: React.MouseEvent) => {
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
        setImageBase64(reader.result as string)
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
    setImageBase64(null)
    if (inputRef.current) {
        inputRef.current.value = ''
    }
  }

  const dragStyle = clsx({
    'bg-primary-100': isFileDragged
  })

  return (
    <section className="flex flex-col px-4">
        {showPreview && imageBase64 && <ImagePreview image={imageBase64} removeImage={clearImage} />}
        <Controller
            name={name}
            control={control}
            rules={rules}
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
                                        accept: 'image/jpeg, image/png'
                                    },
                                }}
                                onChange={handleImageUpload}
                            />
                            {
                                !imageUploading ? (
                                    <>
                                        <Icon name="AiOutlineCloudUpload" size={32} color="primary-500" />
                                        <p className='text-lg text-primary-500'>Drop the photo or click to upload,</p>
                                    </>
                                ) : (
                                    <LoadingIcon text='Uploading...'/>
                                )
                            }
                    </section>
                )
            }
        />
    </section>
  )
}

export default ImageInput