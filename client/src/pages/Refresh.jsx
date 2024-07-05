import { Navigate, useSearchParams } from "react-router-dom"
import useRefreshToken from "../hooks/useRefreshToken"
import { useEffect, useState } from "react"

const Refresh = () => {
    const [ loading, setLoading ] = useState(true);
    const refresh = useRefreshToken();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const verifyToken = async () => {
            console.log("Refreshing...")
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
        verifyToken()
    }, [])

    return (
        loading 
            ? <div>Refreshing...</div>
            : <Navigate to={searchParams.get("url")||"/"}/>
    )
}

export default Refresh