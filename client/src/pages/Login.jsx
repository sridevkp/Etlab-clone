import React, { useContext, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  const handleSubmit = () => {

    // response = fetch post data
    // if( response.status == 200 ){
    //   const user = response.user
    //   const token = response.token
    //   setAuth({ user , token })
    //   navigate( response.redirect )
    // }else{
    //   alert("failure")
    // }
  }

  return (
    <div className='container'>
      <div className='container p-5'>
        <form onSubmit={handleSubmit()} >
          <h2 className='text-2xl font-bold my-8 opacity-50'>Login</h2>
          <div className='flex-col mb-4'>
            <Label htmlFor="username" className="font-extralight">Username</Label>
            <Input id="username" placeholder="23cs453" />
          </div>
          <div className='flex-col mb-4'>
            <Label htmlFor="password" className="font-extralight">Password</Label>
            <Input id="password" placeholder="password" type="password"/>
          </div>
          <Button type="submit" className="">Submit</Button>
        </form>
      </div>
    </div>
  )
}

export default Login

