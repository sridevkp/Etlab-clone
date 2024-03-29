import React from 'react'
import { Outlet } from 'react-router-dom'
import "./layout.css"
// import banner from "../assets/banner.png"
import bannerDark from "../assets/banner-dark.png"


function LandingLayout() {
  return (
    <>
        <header className='landing header'>
            <img src={bannerDark} className='banner'/>
            {/* <h2> MyLab </h2> */}
        </header>
        <main>
          <Outlet/>
        </main>
        
    </>
  )
}

export default LandingLayout