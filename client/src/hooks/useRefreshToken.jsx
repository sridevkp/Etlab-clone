import { jwtDecode } from "jwt-decode"
import axios from "../api/axios"
import useAuth from "./useAuth"

const useRefreshToken = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        try{
            const res = await axios.get("/auth/refresh", { withCredentials : true })
            const accessToken = res.data.accessToken
            const user = jwtDecode(accessToken)
            
            setAuth( prev => {
                return { 
                    accessToken ,
                    user
                }
            })    
            return accessToken 
        }
        catch(e){
            return console.log(e)
        }   
    }
    return refresh
}

export default useRefreshToken