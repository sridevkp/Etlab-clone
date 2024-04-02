import React from 'react'
import { Outlet } from 'react-router-dom'
import LogoutBtn from '../components/LogoutBtn'


function ParentLayout() {
  return (
    <>
        <header className='flex bg-red-800 px-1 py-2 justify-between items-center'>
            <h2 className='mr-auto font-bold text-2xl mr-auto'>Parent</h2>
            <LogoutBtn/>
        </header>
        <Outlet/>
    </>
  )
}

export default ParentLayout