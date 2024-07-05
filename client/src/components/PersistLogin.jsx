import { useContext, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import useRefreshToken from "../hooks/useRefreshToken"
import useAuth from "../hooks/useAuth"
import AuthContext from "../context/AuthProvider"

const PersistLogin = () => {
    const { persist } = useContext( AuthContext )
    const { auth } = useAuth()
    const [ loading, setLoading ] = useState(true)
    const refresh = useRefreshToken()
    
    useEffect( () => {
        const verifyRefreshToken = async () => {
            console.log("Persisting...")
            setLoading(true)
            try{
                await refresh()
            }
            catch( err ){
                console.log(err.message)
            }finally{
                setLoading(false)
            }
        }
        
        !auth?.accessToken && persist
            ? verifyRefreshToken()
            : setLoading(false)
    }, [])

    return (
        loading 
            ? <div>Loading...</div>
            : <Outlet/>
    )
}

export default PersistLogin