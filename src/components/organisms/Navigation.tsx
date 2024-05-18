import Icon from '@atoms/Icon'
import TextField from '@atoms/TextField'
import clsx from 'clsx'
import useAuth from 'hooks/useAuth'
import useHandleOutside from 'hooks/useHandleOutside'
import useWindowDimension from 'hooks/useWindowDimension'
import React, { ReactFragment, useCallback, useEffect } from 'react'
import { useController, useForm } from 'react-hook-form'
import { Link, Navigate, useNavigate } from 'react-router-dom'

interface AuthorizedNavigationProps {
    device: DeviceType
    openSearchModal: () => void
}

interface Props {
    authorized: boolean | false
}

interface SearchFormProps {
    search: string
}

const UnAuthorizedNavigation = () => {
    return (
        <ul className='flex flex-row gap-4 items-center text-lg'>
            <li className='font-medium'><Link to='/login'>Login</Link></li>
            <li className='cta-primary'><Link to='/signup'>Signup</Link></li>
        </ul>
    )
}

const SearchBar = React.forwardRef<HTMLFormElement>((props,ref) => {
    const navigate = useNavigate()
    const {control, handleSubmit} = useForm<SearchFormProps>({defaultValues: {search: ''}})

    const handleSearch = (data: SearchFormProps) => navigate(`/search?q=${data.search}`)

    return (
        <form 
            ref={ref} 
            className='w-full md:w-96 lg:w-[30rem]' 
            onSubmit={handleSubmit(handleSearch)}
            {...props}>
            <TextField
                control={control} 
                rules={{search: {required: true}}} 
                name='search' 
                type='text' 
                placeholder='What recipe are you looking for?' 
                TrailingIcon={<Icon name='AiOutlineSearch' size={32} color='primary-500' onClick={handleSubmit(handleSearch)} />}
            />
        </form>
    )
})

const SearchModal: React.FC<{isOpen: boolean, closeModal: () => void}> = ({isOpen, closeModal}) => {

    const ref = useHandleOutside<HTMLFormElement>(closeModal)

    return isOpen && (
        <section className='w-full h-full fixed top-0 left-0 z-50'>
            <section className='w-full h-full bg-black/50 backdrop-blur-sm flex flex-col justify-center items-center'>
                <SearchBar ref={ref} />
                <span className='absolute top-5 right-5'>
                    {/* <Icon name='AiOutlineClose' size={32} color='white' onClick={closeModal} /> */}
                </span>
            </section>
        </section>
    )
}

const AuthorizedNavigation: React.FC<AuthorizedNavigationProps> = ({device, openSearchModal}) => {
    return (
        <ul className='flex flex-row gap-4 items-center justify-center text-lg'>
            <li className=''>
                {
                    device === 'desktop' ? 
                        <SearchBar /> : 
                        <Icon 
                            name='AiOutlineSearch' 
                            size={32} color='primary-900' 
                            onClick={openSearchModal} 
                        />
                }
            </li>
            <li title='Create Post' className=''>
                <Link to='/new'>
                    <Icon name='AiFillPlusCircle' size={32} color='primary-900' />
                </Link>
            </li>
            <li title='Favorites' className='font-medium'>
                <Link to='/favorites'>
                    <Icon name='AiOutlineHeart' size={32} color='primary-900' />
                </Link>
            </li>
            <ProfileMenu />
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

    const handleLogout = () => {
        logout()
        setShowProfileMenu(false)
    }

    const ref = useHandleOutside<HTMLLIElement>(() => setShowProfileMenu(false))

    const FunctionableList: React.FC<{children: React.ReactNode, onClick?: React.MouseEventHandler<HTMLLIElement>, title?: string}> = ({children, onClick, title}) => (
        <li title={title} onClick={onClick} className='hover:font-medium px-2'>{children}</li>
    )

    return (
        <li ref={ref} title='Profile'  className='relative flex flex-col items-end cursor-default'>
            <Icon onClick={handleClick} name='AiOutlineUser' size={32} color='primary-900' />
            <ul className={`absolute top-10 w-60 flex-col gap-2 text-xl p-4 rounded-xl shadow-md border border-white bg-white/90 ${profileShown}`}>
                <li className='border-b border-primary-300 py-4 select-none text-black/80 cursor-default'>Andrew Loloy</li>
                <FunctionableList title='Manage Profile'><Link to='/profile'>Manage Profile</Link></FunctionableList>
                <FunctionableList title='Logout' onClick={handleLogout}>Logout</FunctionableList>
            </ul>
        </li>
    )
}


const Navigation: React.FC<Props> = ({authorized}) => {
  const ref = React.useRef(null)

  const [isOnTop, setIsOnTop] = React.useState(window.scrollY === 0)
  const [isSearchModalOpen, setIsSearchModalOpen]= React.useState(false)

  const {device} = useWindowDimension()

  const openSearchModal = () => {
    setIsSearchModalOpen(true)
  }

  const closeSearchModal = () => {
    setIsSearchModalOpen(false)
  }

  const handleScroll = () => {
    setIsOnTop(window.scrollY === 0)
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const onScrollStyle = clsx({
      'bg-white/45 border-b border-white': !isOnTop
  })

  return (
    <>  
        <section ref={ref} className={`w-full fixed z-50 transition-all duration-300 backdrop-blur-md top-0 ${onScrollStyle}`}>
            <section className='container mx-auto'>
                <header className='tm-header z-50'>
                    <h1 className='tm-logo'><Link to='/'>tummy</Link></h1>
                    {
                        authorized ?
                        <nav>
                            <AuthorizedNavigation device={device} openSearchModal={openSearchModal}/>
                        </nav>
                        : <UnAuthorizedNavigation />
                    }
                </header>
            </section>
        </section>

        <SearchModal isOpen={isSearchModalOpen} closeModal={closeSearchModal}/>
    </>
  )
}

export default Navigation