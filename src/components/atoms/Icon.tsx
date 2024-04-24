import React from 'react'
import * as AiIcons from 'react-icons/ai'
import { IconType } from 'react-icons'
import clsx from 'clsx';

export type IconTypes = keyof typeof AiIcons

interface IconProps{
    name: IconTypes;
    size: number;
    color: ColorsType;
    onClick?: React.MouseEventHandler<SVGElement>;
}

const getIconComponent = (name: IconTypes): IconType | undefined => {
    const aiIcons = AiIcons as Record<string, React.ComponentType>
    return aiIcons[name as keyof typeof aiIcons] as IconType
}

const Icon: React.FC<IconProps> = ({name, size, color = 'primary-500', onClick}) => {
  const IconComponent = getIconComponent(name)

  if (!IconComponent) {
      throw new Error(`Icon with name "${name}" not found in AiIcons`);
  }

  const iconClickable = clsx({
    'cursor-pointer transition duration-300 hover:scale-110': onClick
  });

  return (
    <IconComponent 
      className={`text-${color} ${iconClickable}`} 
      size={size} 
      onClick={onClick}
    />
  )
}

export default Icon