import { useEffect, useState } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { motion } from "framer-motion"

function Profile() {
  const axiosPrivate = useAxiosPrivate()
  const [ bio, setBio ] = useState()

  useEffect( () => {
    const controller = new AbortController()
    const signal = controller.signal
    const fetchData = async () => {
      try{
        const res = await axiosPrivate.get(`http://localhost:8080/users/bio`, { signal })
        setBio( res.data ) 
      }catch( err ){
        console.log( err )
      }
    }
    fetchData()
    return () => controller.abort()
  },[])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      transition={{duration: 0.2, ease:"easeOut"}}
    >
      {
        !bio 
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
    </motion.div>
  )
}

export default Profile