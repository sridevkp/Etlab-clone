import useAuth from "../hooks/useAuth"
import defaultProfile from "../assets/default.jpeg"
import { Button } from "@/components/ui/button"
import { ImProfile } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import { RiInboxFill } from "react-icons/ri";
import { PiSignOutBold } from "react-icons/pi";

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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
      <DrawerTrigger>
        <Button variant="outline" className="flex items-center gap-x-2">
          {auth.name}
          <IoIosArrowDown className="opacity-40"/>
        </Button>
      </DrawerTrigger>

      <DrawerContent className="justify-center items-center">

        <DrawerHeader className="max-w-md w-full">
          <DrawerTitle>{auth.name}</DrawerTitle>
          <DrawerDescription>{auth.role}</DrawerDescription>
        </DrawerHeader>

        <DrawerFooter className="max-w-md w-full">
          <div className="w-full flex justify-center">
            <img src={defaultProfile} className="rounded-lg w-full"/>
          </div>
          <div className="flex gap-2">
            <Link to={`/${auth.role}/profile`} className="w-full">
              <Button variant="outline" className="w-full gap-3">
                  <ImProfile/>
                  Profile
              </Button>
            </Link>

            <Link to={`/${auth.role}/inbox`} className="w-full">
              <Button variant="outline" className="w-full gap-3">
                <RiInboxFill/>
                Inbox
              </Button>
            </Link>
          </div>

          <Link className="w-full" onClick={handleClick}>
            <Button variant="destructive" className="w-full gap-3">
              <PiSignOutBold/>
              Logout
            </Button>
          </Link>

          <DrawerClose>
              <Button className="w-full" >Cancel</Button>
          </DrawerClose>
          
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
  // return (
  //   auth && 
  //   <DropdownMenu>

  //     <DropdownMenuTrigger>
  //       
  //     </DropdownMenuTrigger>

  //     <DropdownMenuContent className="/w-screen sm: w-[300px] sm:-translate-x-4">

  //       <DropdownMenuLabel>My Account</DropdownMenuLabel>

  //       <DropdownMenuSeparator />
  //       <div className="grid grid-rows-3 grid-cols-[1fr,1fr]">

  //         <DropdownMenuItem className="row-span-3 justify-center">
  //           <img src={defaultProfile} className="rounded-md"/>
  //         </DropdownMenuItem>

  //         <DropdownMenuItem className="gap-x-2 hover:underline">
            
  //           <Link to={`/${auth.role}/profile`} className="w-full h-full flex items-center justify-start gap-x-5">
  //             <ImProfile/>
  //             Profile
  //           </Link>
  //         </DropdownMenuItem>

  //         <DropdownMenuItem className="gap-x-2 hover:underline">
            
  //           <Link to={`/${auth.role}/inbox`} className="w-full h-full flex items-center justify-start gap-x-5">
  //             <RiInboxFill/>
  //             Inbox
  //           </Link>
  //         </DropdownMenuItem>

  //         <DropdownMenuItem className="gap-x-5 hover:underline text-red-600" onClick={handleClick}>
  //           <PiSignOutBold/>
  //           Logout
  //         </DropdownMenuItem>
  //       </div>
  //     </DropdownMenuContent>
  //   </DropdownMenu>
  // )
}

export default UserNav