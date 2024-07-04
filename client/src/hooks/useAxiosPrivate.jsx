import { useEffect } from "react"
import axios, { axiosPrivate } from "../api/axios"
import useAuth from "./useAuth"
import useRefreshToken from "./useRefreshToken"

const useAxiosPrivate = () => {
    const { auth, setAuth } = useAuth()

    const refresh = useRefreshToken()

    useEffect( () => {

        const reqInterceptor = axiosPrivate.interceptors.request.use( 
            config => {
                if( !config.headers["authorization"] ){
                    config.headers["authorization"] = `Bearer ${auth.accessToken}`
                }
                return config 
            },
            err => console.log( err ) )

        const resInterceptor = axiosPrivate.interceptors.response.use(
            res => res, 
            async err => {
                const prevReq = err?.config 
                if( err?.response?.status == 403 && ! prevReq?.sent ){
                    prevReq.sent = true
                    const newAccessToken = await refresh()
                    if( ! newAccessToken ) return ;
                    prevReq.headers["authorization"] = `Bearer ${newAccessToken}`
                    return axiosPrivate( prevReq )
                }
            }
        )

        return () => {
            axiosPrivate.interceptors.response.eject( resInterceptor )
            axiosPrivate.interceptors.request.eject( reqInterceptor )
        }
    }, [auth] )
    

  return axiosPrivate
}

export default useAxiosPrivate