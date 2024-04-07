import React from 'react'
import { Outlet } from 'react-router-dom'
import LogoutBtn from '../components/LogoutBtn'
import User from '../components/User'


function StudentLayout() {
  return (
    <>
        <header className='flex shadow-slate-50 shadow-sm px-1 py-2 justify-between items-center gap-2'>
            <h2 className='mr-auto font-bold text-2xl mr-auto'>Student</h2>
            <User/>
            <LogoutBtn/>
        </header>
        <Outlet/>
    </>
  )
}

export default StudentLayout