import { Button } from "@/components/ui/button"
import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import axios from "../api/axios"

const LogoutBtn = () => {
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const logout = () => {
    setAuth({})
    navigate( "/login" )
    axios.delete('/auth',{ withCredentials:true})
  } 

  return (
    <Button variant="destructive" onClick={logout}>Logout</Button>
  )
}

export default LogoutBtn