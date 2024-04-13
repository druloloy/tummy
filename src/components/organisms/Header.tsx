import { app } from '@fb/app'
import { getAuth } from '@firebase/auth'
import clsx from 'clsx'
import useAuth from 'hooks/useAuth'
import React, { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'

type LinkType = {
    name: string,
    path: string,
    primary: boolean,
    onClick?: (arg: any) => void
}

type HeaderListType = {
    authorized: Array<LinkType>,
    unauthorized: Array<LinkType>
}

const HeaderList = (): HeaderListType => {
    const {logout} = useAuth()

    return {
        authorized: [
            {
                name: 'Log Out',
                path: '/',
                primary: true,
                onClick: () => {
                    logout();
                }
            }
        ],
        unauthorized: [
            {
                name: 'Login',
                path: '/login',
                primary: false,
                
            },
            {
                name: 'Sign Up',
                path: '/signup',
                primary: true
            }
        ]
    }
}

interface Props {
    authorized: boolean | false
}

const ListItems = (authorized: boolean) => {

    

    return HeaderList()[authorized ? 'authorized' : 'unauthorized'].map((item, index) => {
        return <li 
            onClick={item.onClick}
            className={item.primary ? 'cta-primary' : ''} 
            key={index}>
                <Link 
                    to={item.path}
                    >
                        {item.name}
                </Link>
            </li>
    })
}

const Header: React.FC<Props> = ({authorized}) => {
const ref = React.useRef(null)
 const [yValue, setYValue] = React.useState(window.scrollY)
 const [isScrollingDown, setIsScrollingDown] = React.useState(false)

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
    <section ref={ref} className={`w-full fixed z-50 transition-all duration-500 bg-white/60 backdrop-blur-md ${clsx({
        '-top-20': isScrollingDown,
        'top-0': !isScrollingDown
    })}`}>
        <section className='container mx-auto'>
            <header className='tm-header z-50'>
                <h1 className='tm-logo'><Link to='/'>tummy</Link></h1>
                <nav>
                    <ul>
                        {ListItems(authorized)}
                    </ul>
                </nav>
            </header>
        </section>
    </section>
  )
}

export default Header