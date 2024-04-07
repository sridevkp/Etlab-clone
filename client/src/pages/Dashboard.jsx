import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { Link } from "react-router-dom"

function Dashboard() {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [ bio, setBio ] = useState()

  useEffect( () => {
    const fetchData = async () => {
      try{
        const res = await axiosPrivate.get(`http://localhost:8080/users/bio`)
        setBio( res.data ) 
      }catch( err ){
        console.log( err )
      }
    }
    fetchData()
  },[])

  return (
    <>
    {
      bio == undefined
      ?<div>Loading...</div>
      :<div className="flex flex-col">
        {
          Object.keys( bio ).map( key => 
            <div key={key}>
              <span className="inline-block min-w-20 text-end">{key} </span> :  
              <span> {bio[key]}</span>
            </div>
          )
        }
      </div>
    }
    <Link to="/students/attendance">attendance</Link>
    </>
    
  )
}

export default Dashboard 