import { useEffect, useState } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { Link } from "react-router-dom"

function Attendance() {
  const axiosPrivate = useAxiosPrivate()
  const [ data, setData ] = useState(null)

  useEffect( () => {
    const getData = async () => {
      const res = await axiosPrivate.get("/users/attendance")
      setData( res.data )
    }
    getData()
  },[])

  return (
    <>
      <div>Attendance</div>
      <div>{data}</div>
      <Link to="/students/dashboard">dash</Link>
    </>
    
  )
}

export default Attendance