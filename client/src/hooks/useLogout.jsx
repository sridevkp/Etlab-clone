import axios from "../api/axios"
import { useNavigate } from "react-router-dom"
import useAuth from "./useAuth"
import { useContext } from "react"
import AuthContext from "../context/AuthProvider"

const useLogout = () => {
    const { setAuth } = useAuth()
    const navigate = useNavigate()
  const { setPersist } = useContext(AuthContext)
    
    const logout = () => {
        setAuth({})
        navigate( "/login" )
        axios.delete('/auth',{ withCredentials:true })
        setPersist(false)
    }
    return logout
}

export default useLogout