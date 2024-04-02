import useAuth from "./useAuth"

const useRefreshToken = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        const res = await fetch("/refresh", { withCredentials : true })
        const token = response.data.token
        setAuth( prev => {
            return { ...prev, token }
        })
        return token    
    }
    return refresh
}

export default useRefreshToken