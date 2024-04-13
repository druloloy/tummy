import { AuthContext, AuthContextProps } from '@contexts/AuthContext'
import { app } from '@fb/app'
import { User, getAuth, onAuthStateChanged } from '@firebase/auth'
import React, { useContext } from 'react'

const useAuth = (): AuthContextProps => {
    return useContext(AuthContext) as AuthContextProps
}

export default useAuth