import React from 'react'
import { Outlet } from 'react-router-dom'
import "./layout.css"


function ParentLayout() {
  return (
    <>
        <header className='parent header'>
            <h2>Parent</h2>
        </header>
        <Outlet/>
    </>
  )
}

export default ParentLayout