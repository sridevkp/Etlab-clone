import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const RequireAuth = () => {
    const auth = useAuth()
    const from = useLocation()
  return (
    auth?.user
        ? <Outlet/>
        : <Navigate to='/login' state={{from}} replace/>
  )
}

export default RequireAuth