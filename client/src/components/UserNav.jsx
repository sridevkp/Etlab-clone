import useAuth from "../hooks/useAuth"
import defaultProfile from "../assets/default.jpeg"
import { Button } from "@/components/ui/button"
import { ExitIcon, ChevronDownIcon, EnvelopeClosedIcon, IdCardIcon } from '@radix-ui/react-icons'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { Link } from "react-router-dom"
import useLogout from "./../hooks/useLogout";
import { useState } from "react";

const UserNav = () => {
    const [ notify, setNotify ] = useState()
    const { auth } = useAuth()
    const logout = useLogout()

    const handleClick = async () => {
      await new Promise( r => setTimeout( r, 1000 ))
      logout()
    }
  return(
    auth &&
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="flex items-center gap-x-2">
          {auth.user.name}
          <ChevronDownIcon className="opacity-40"/>
        </Button>
      </DrawerTrigger>

      <DrawerContent className="justify-center items-center">

        <DrawerHeader className="max-w-md w-full">
          <DrawerTitle>{auth.user.name}</DrawerTitle>
          <DrawerDescription>{auth.user.role}</DrawerDescription>
        </DrawerHeader>

        <DrawerFooter className="max-w-md w-full">
          <div className="w-full flex justify-center">
            <img src={ auth.user.picture || defaultProfile} className="rounded-lg w-full"/>
          </div>
          <div className="flex gap-2">
            <Link to={`/${auth.user.role}/profile`} className="w-full">
              <Button variant="outline" className="w-full gap-3">
                  <IdCardIcon/>
                  Profile
              </Button>
            </Link>

            <Link to={`/${auth.user.role}/inbox`} className="w-full">
              <Button variant="outline" className="w-full gap-3">
                <EnvelopeClosedIcon/>
                Inbox
              </Button>
            </Link>
          </div>

          <Link className="w-full" onClick={handleClick}>
            <Button variant="destructive" className="w-full gap-3">
              <ExitIcon/>
              Logout
            </Button>
          </Link>

          <DrawerClose asChild>
            <Button className="w-full" >Cancel</Button>
          </DrawerClose>
          
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default UserNav