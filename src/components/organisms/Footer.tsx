import React from 'react'
import { Link, LinkProps, useLocation } from 'react-router-dom'
import Icon, { IconTypes } from '@atoms/Icon'
import clsx from 'clsx'


const Button: React.FC<LinkProps & { iconName: IconTypes }> = ({to, iconName, ...props}) => {   
    const isActive = useLocation().pathname === to
    const activeStyle = clsx(
        {
            'opacity-60': isActive,
            'opacity-100': !isActive
        }
    )

    return (
        <Link
            className={`flex-1 text-center p-2 flex justify-center items-center hover:bg-primary-100 transition-colors duration-300 ${activeStyle}`}
            to={to}
            {...props}
        >
            <Icon
                name={iconName}
                size={32}
                color='primary-300'
            />
        </Link>

    )
}

const NavigationItems: { to: string, iconName: IconTypes }[] = [
    {
        to: '/',
        iconName: 'AiOutlineHome'
    },
    {
        to: '/search',
        iconName: 'AiOutlineSearch'
    },
    {
        to: '/new',
        iconName: 'AiFillPlusCircle'
    },
    {
        to: '/favorites',
        iconName: 'AiOutlineHeart'
    },
    {
        to: '/profile',
        iconName: 'AiOutlineUser'
    }
]

const ListItems = () => {
    return NavigationItems.map((item, index) => {
        return <Button key={index} to={item.to} iconName={item.iconName} />
    })
}


export const Footer: React.FC<{ authorized: boolean }> = ({ authorized }) => {
  return authorized && (
    <section className='w-full fixed bottom-5 z-50'>
        <section className='relative w-11/12 lg:w-5/12 bg-white/60 backdrop-blur-md mx-auto flex flex-row items-center justify-evenly shadow-xl rounded-full z-50 overflow-hidden'>
            <ListItems />
        </section>
    </section>
  )
}
