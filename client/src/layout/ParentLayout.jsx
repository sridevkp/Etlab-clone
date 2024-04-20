import React from 'react'
import { Outlet } from 'react-router-dom'
import User from '../components/UserNav'


function ParentLayout() {
  return (
    <>
        <header className='flex shadow-slate-50 shadow-sm gap-2 bg-red-800 px-1 py-2 justify-between items-center'>
            <h2 className='mr-auto font-bold text-2xl mr-auto'>Parent</h2>
            <UserNav/>
        </header>
        <Outlet/>
    </>
  )
}

export default ParentLayout