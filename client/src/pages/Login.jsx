import { useRef, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

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
        const URL = "http://localhost:8080/login"
        const response = await fetch( URL, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({ username, pwd })
        })
        
        if( response.ok ){
          const data = await response.json() 
          
          setAuth({
            user : {
              name : data.username,
              role : data.role
            } ,
            token : data.token
          })
          // location.state?.from?.pathname ||
          navigate( data.redirect, { replace: true } )
        }else{
          setErr( response.status == 404 ? "username" : "pwd" )
        }

      }catch( err ){
        console.log(err)
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

