import React from 'react'
import { Outlet } from 'react-router-dom'
import "./layout.css"


function AdminLayout() {
  return (
    <>
        <header className='admin header'>
            <h2>Admin</h2>
        </header>
        <Outlet/>
    </>
  )
}

export default AdminLayout