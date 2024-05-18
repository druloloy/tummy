import { AuthContext, AuthContextProps } from '@contexts/AuthContext'
import { useContext } from 'react'

const useAuth = (): AuthContextProps => {
    return useContext(AuthContext) as AuthContextProps
}

export default useAuth