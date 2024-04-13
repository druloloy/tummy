import useAuth from 'hooks/useAuth'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface PublicRouteProps {
  children: React.ReactNode
}

const ForbiddenPaths = [
  '/login',
  '/signup/create-account',
]

const PublicRoute: React.FC<PublicRouteProps> = ({children}) => {
  const { user, isEmailVerified, isLoading } = useAuth()
  const location = useLocation()

  if (!isLoading && user && ForbiddenPaths.includes(location.pathname)) {
    return <Navigate to="/" />
  }

  return <>{children}</>
}

export default PublicRoute
