import { useEffect, useState } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      transition={{duration: 0.2, ease:"easeOut"}}
    >
      {data}
    </motion.div>
    
  )
}

export default Attendance