import { useContext, useRef, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

import axios from "../api/axios"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import AuthContext from '../context/AuthProvider'
import { motion } from "framer-motion"



function Login() {
  const { persist, setPersist } = useContext(AuthContext)
  const [ name, setName ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ err, setErr ] = useState(null)
  const {toast} = useToast()
  // const [showPwd, setShowPwd] = useState(false);

  const form = useRef()
  const { setAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async e => {
      e.preventDefault()

      let username = name.trim()
      let pwd = password.trim()

      if( !username ) return toast({ title: "Enter username", variant: "destructive" })
      if( !pwd ) return toast({ title: "Enter password", variant: "destructive" })
      
      try{
        const response = await axios.post( "/auth", 
                            JSON.stringify({ username, pwd }),
                            {
                              headers : { "Content-Type": "application/json" },
                              withCredentials : true
                            }
                          )
        
        setAuth({
          id   : response.data.id,
          name : response.data.username,
          role : response.data.role,
          token : response.data.token
        })
        toast({ title: "Login successfull"} )
        await new Promise(r => setTimeout(r, 1000));
        navigate( response.data.redirect, { replace: true } )
      
      }catch( err ){
        console.log( err )
        toast( { title: "Login failed", description: err.message, variant: "destructive" })
        if( err.response ) setErr( err.response.status == 404 ? "username" : "pwd" ) ;
      }

  }

  return (
    <motion.div 
      className='container w-screen'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // exit={{ opacitsy: 0 }}
      transition={{duration: 0.2, ease:"easeOut"}}
    >
      <Toaster className="w-full"/>
      <div className='container p-5 max-w-xs'>
        <form onSubmit={handleSubmit} ref={form}>

          <h2 className='text-2xl font-bold my-7 opacity-70'>Login</h2>
          
          <div className='flex-col mb-4'>
            <Label htmlFor="username" className="font-extralight">Username</Label>
            <Input id="username" placeholder="23cs453" onChange={e=>{ setName(e.target.value)}} />
            {err == "username" && <p className='text-xs text-red-900'>invalid username</p>}
          </div>

          <div className='flex-col mb-4'>
            <Label htmlFor="password" className="font-extralight">Password</Label>
            <Input id="password" placeholder="password" type="password" onChange={e=>{ setPassword(e.target.value)}}/>
            {err == "pwd" && <p className='text-xs text-red-900'>incorrect password</p>}
          </div>

          <div className='flex items-center space-x-2 my-2'>
            <Checkbox id="rememberme" checked={persist} onCheckedChange={ checked => setPersist(checked) }/>
            <Label htmlFor="rememberme" className="font-extralight">remember me?</Label>
          </div>
          <Button type="submit" className="w-full">Submit</Button>

        </form>
      </div>
    </motion.div>
  )
}

export default Login

