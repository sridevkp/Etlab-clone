import axios from "../api/axios"
import { useNavigate } from "react-router-dom"
import useAuth from "./useAuth"

const useLogout = () => {
    const { setAuth } = useAuth()
    const navigate = useNavigate()
    
    const logout = () => {
        setAuth({})
        navigate( "/login" )
        axios.delete('/auth',{ withCredentials:true})
    }
    return logout
}

export default useLogout