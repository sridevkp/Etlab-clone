import { Button } from "@/components/ui/button"
import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import axios from "../api/axios"
import ConfettiExplosion from 'react-confetti-explosion';
import { useState } from "react";
import useLogout from "../hooks/useLogout";



const LogoutBtn = () => {
  const { setAuth } = useAuth()
  const navigate = useNavigate()
  const [isExploding, setIsExploding] = useState(false);
  const logout = useLogout()

  const handleClick = async () => {
    setIsExploding(true)
    await new Promise( r => setTimeout( r, 1000 ))
    logout()
  } 

  return (
    <>
      {isExploding && <ConfettiExplosion />}
      <Button variant="destructive" onClick={handleClick}>Logout</Button>
    </>
  )
}

export default LogoutBtn