import { useRef, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import axios from "../api/axios"

function Login() {
  const [username,setUsername] = useState("")
  const [pwd,setPwd] = useState("")
  const [ err, setErr ] = useState(null)
  // const [showPwd, setShowPwd] = useState(false);

  const form = useRef()
  const { setAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async e => {
      e.preventDefault()
      
      try{
        const response = await axios.post( "/auth", 
                            JSON.stringify({ username, pwd }),
                            {
                              headers : { "Content-Type": "application/json" },
                              withCredentials : true
                            }
                          )
        setAuth({
          user : {
            id   : response.data.id,
            name : response.data.username,
            role : response.data.role
          } ,
          token : response.data.token
        })
        navigate( response.data.redirect, { replace: true } )
      
      }catch( err ){
        if( err.response ) setErr( err.response.status == 404 ? "username" : "pwd" ) ;
      }

  }

  return (
    <div className='container w-screen'>
      <div className='container p-5 max-w-xs'>
        <form onSubmit={handleSubmit} ref={form}>

          <h2 className='text-2xl font-bold my-7 opacity-70'>Login</h2>
          
          <div className='flex-col mb-4'>
            <Label htmlFor="username" className="font-extralight">Username</Label>
            <Input id="username" placeholder="23cs453" onChange={e=>{ setUsername(e.target.value)}} />
            {err == "username" && <p className='text-xs text-red-900'>invalid username</p>}
          </div>

          <div className='flex-col mb-4'>
            <Label htmlFor="password" className="font-extralight">Password</Label>
            <Input id="password" placeholder="password" type="password" onChange={e=>{ setPwd(e.target.value)}}/>
            {err == "pwd" && <p className='text-xs text-red-900'>incorrect password</p>}
          </div>

          <Button type="submit" className="w-full">Submit</Button>

        </form>
      </div>
    </div>
  )
}

export default Login

