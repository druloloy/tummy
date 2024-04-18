import Icon from '@atoms/Icon'
import clsx from 'clsx'
import useAuth from 'hooks/useAuth'
import useWindowDimension from 'hooks/useWindowDimension'
import useWindowDimensions from 'hooks/useWindowDimension'
import React, { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'

type LinkType = {
    name: string,
    path: string,
    primary: boolean,
    onClick?: (arg: any) => void
}

type NavigationListType = {
    authorized: boolean
}

interface Props {
    authorized: boolean | false
}

const UnAuthorizedNavigation = () => {
    return (
        <ul className='flex flex-row gap-4 items-center text-lg'>
            <li className='font-medium'><Link to='/login'>Login</Link></li>
            <li className='cta-primary'><Link to='/signup'>Signup</Link></li>
        </ul>
    )
}

const DesktopNavigation: React.FC<NavigationListType> = ({authorized}) => {
    return (
        <ul>
            {
                authorized ?  <ProfileMenu /> : <UnAuthorizedNavigation />
            }
        </ul>
    )
}

const MobileNavigation: React.FC<NavigationListType> = ({authorized}) => {
    return (
        <ul>

        </ul>
    )
}

const ProfileMenu: React.FC = () => {
    const { logout } = useAuth()
    const [showProfileMenu, setShowProfileMenu] = React.useState(false)

    const profileShown = clsx({
        'hidden': !showProfileMenu,
        'flex': showProfileMenu
    })

    const handleClick = () => {
        setShowProfileMenu(!showProfileMenu)
    }

    const List: React.FC<{children: React.ReactNode, onClick?: React.MouseEventHandler<HTMLLIElement>}> = ({children, onClick}) => (
        <li onClick={onClick} className='hover:font-medium px-2'>{children}</li>
    )

    return (
        <li className='relative flex flex-col items-end'>
            <Icon onClick={handleClick} name='AiOutlineUser' size={32} color='primary-500' />
            <ul className={`absolute top-10 w-60 flex-col gap-2 bg-white text-xl p-4 rounded-xl shadow-md ${profileShown}`}>
                <li className='border-b border-primary-300 py-4 select-none text-black/80'>Andrew Loloy</li>
                <List><Link to='/profile'>Manage Profile</Link></List>
                <List onClick={() => logout()}>Logout</List>
            </ul>
        </li>
    )
}


const Navigation: React.FC<Props> = ({authorized}) => {
  const ref = React.useRef(null)
  const [yValue, setYValue] = React.useState(window.scrollY)
  const [isScrollingDown, setIsScrollingDown] = React.useState(false)
  const {device} = useWindowDimension()

  const handleScroll = useCallback(()=>{
    setIsScrollingDown(window.scrollY > yValue)
    setYValue(window.scrollY)
  }, [yValue])
  
  useEffect(() => {
      window.addEventListener('scroll', handleScroll)
    //   hideHeaderOnScroll()

      return () => {
          window.removeEventListener('scroll', handleScroll)
      }
  }, [yValue])


  return (
    <section ref={ref} className={`w-full fixed z-50 transition-all duration-1000 bg-white/60 backdrop-blur-md ${clsx({
        '-top-full': isScrollingDown,
        'top-0': !isScrollingDown
    })}`}>
        <section className='container mx-auto'>
            <header className='tm-header z-50'>
                <h1 className='tm-logo'><Link to='/'>tummy</Link></h1>
                <nav>
                    {
                        device === 'desktop' ? <DesktopNavigation authorized={authorized} /> : <MobileNavigation authorized={authorized} />
                    }
                </nav>
            </header>
        </section>
    </section>
  )
}

export default Navigation