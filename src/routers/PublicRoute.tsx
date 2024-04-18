import useAuth from 'hooks/useAuth'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface PublicRouteProps {
  children: React.ReactNode
}

const ForbiddenPaths = [
  '/login',
  '/signup/*',
]

function isForbidden(path: string) {
  const exactPaths = ForbiddenPaths.filter((path_) => !path_.endsWith('/*'));
  const wildcardPaths = ForbiddenPaths.filter((path_) => path_.endsWith('/*')).map((path_) => path_.slice(0, -2));

  return exactPaths.includes(path) ||
         wildcardPaths.some((path_) => path.startsWith(path_));
}


const PublicRoute: React.FC<PublicRouteProps> = ({children}) => {
  const { user, isEmailVerified, isLoading } = useAuth()
  const location = useLocation()

  if (!isLoading && user && isForbidden(location.pathname)) {
    return <Navigate to="/" />
  }

  return <>{children}</>
}

export default PublicRoute
