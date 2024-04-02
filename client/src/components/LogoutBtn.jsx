import { Button } from "@/components/ui/button"
import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

const LogoutBtn = () => {
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const logout = () => {
    setAuth({})
    navigate( "/login" )
  } 

  return (
    <Button variant="destructive" onClick={logout}>Logout</Button>
  )
}

export default LogoutBtn