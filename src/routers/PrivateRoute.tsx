import { app } from '@fb/app'
import { User, getAuth, onAuthStateChanged } from '@firebase/auth'
import useAuth from 'hooks/useAuth'
import React, { useEffect, useMemo } from 'react'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
  children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
  const { user, isEmailVerified, isLoading } = useAuth()

  if (!isLoading && !user) {
    return <Navigate to="/login" />
  }

  if (!isLoading && (user && !isEmailVerified)) {
    return <Navigate to="/verify" />
  }

  return <>{children}</>
}

export default PrivateRoute
