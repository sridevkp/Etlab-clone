import React from 'react'
import { Outlet } from 'react-router-dom'
import "./layout.css"


function StudentLayout() {
  return (
    <>
        <header className='student header bg-red-500'>
            <h2>Student</h2>
        </header>
        <Outlet/>
    </>
  )
}

export default StudentLayout