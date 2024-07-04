import { useContext, useRef, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

import axios from "../api/axios"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

import GoogleSigninBtn from "../components/GoogleSigninBtn"
import AuthContext from '../context/AuthProvider'



function Login() {
  const { persist, setPersist } = useContext(AuthContext)
  const [ name, setName ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ err, setErr ] = useState(null)
  const { toast } = useToast()

  const form = useRef()
  const { auth, setAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async e => {
      e.preventDefault()

      let email = name.trim()
      let pwd = password.trim()

      if( !email ) return toast({ title: "Enter email", variant: "destructive" })
      if( !pwd ) return toast({ title: "Enter password", variant: "destructive" })
      
      try{
        const response = await axios.post( "/auth", 
                            JSON.stringify({ email, pwd }),
                            {
                              headers : { "Content-Type": "application/json" },
                              withCredentials : true
                            }
                          )
        const accessToken = response.data.accessToken
        const user = jwtDecode(accessToken)
        setAuth({
          accessToken,
          user
        })

        toast({ title: "Login successfull"} )
        await new Promise(r => setTimeout(r, 1000));
        navigate( response.data.redirect, { replace: true } )
      
      }catch( err ){
        console.log( err )
        toast( { title: "Login failed", description: err.message, variant: "destructive" })
        if( err.response ) setErr( err.response.status == 404 ? "email" : "pwd" ) ;
      }

  }
  
  const handleCallbackResponse = async response => {
    const token = response.credential

    try{
      const response = await axios.post("/auth/google", 
        JSON.stringify({token}),
        {
          headers : { "Content-Type": "application/json" },
        })
      // const data = jwtDecode(token)
      // setAuth(data)
      console.log(response)
    }catch( err ){
      toast( { title: "Login failed", description: err.message, variant: "destructive" })
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
            <Label htmlFor="email" className="font-extralight">Email</Label>
            <Input id="email" placeholder="23cs453@mgits.ac.in" onChange={e=>{ setName(e.target.value)}} />
            {err == "email" && <p className='text-xs text-red-900'>invalid email</p>}
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

        <Separator className="my-5 mx-3 w-auto"/>
        
        <div className="flex justify-center">
          <GoogleSigninBtn handleCallbackResponse={handleCallbackResponse}/>
        </div>

      </div>
    </motion.div>
  )
}

export default Login

