import React from 'react'
import { Navigate, useLocation } from 'react-router'
import useAuth from '../Hooks/useAuth'


type ProtectedRouteProps = {
    allowedRoles: Role[]
    redirectPath?: string
    children: React.ReactNode
}

type Role =  "USER" | "ADMIN"


const ProtectedRoute = ({ allowedRoles, redirectPath = "/login", children }: ProtectedRouteProps) => {
    const {auth} = useAuth()
    const location = useLocation()
    
    return allowedRoles.includes(auth?.role) && auth?.jwt ? 
        <>{children}</> : 
        auth?.jwt ?
            <Navigate to={"/unauthorized"} state={{ from: location}} replace /> :
            <Navigate to={redirectPath} state={{ from: location}} replace />;
  };

export default ProtectedRoute
