import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const RequireAuth = ({roles}) => {
    const {auth} = useAuth()
    const from = useLocation()
    
  return (
    auth?.role
        ? roles.includes( auth.role )
          ? <Outlet/>
          : <Navigate to='/unauthorized' state={{from}} replace/>
        : <Navigate to='/login' state={{from}} replace />
  )
}

export default RequireAuth