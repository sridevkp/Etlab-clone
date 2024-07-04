import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Separator } from "@/components/ui/separator"
import UserNav from '../components/UserNav'
import useAuth from '../hooks/useAuth'
import { PiExam } from "react-icons/pi";
import { PiMoney } from "react-icons/pi";
import { TbCalendarX } from "react-icons/tb";
import { LiaUserCheckSolid } from "react-icons/lia";
import Tooltip from '@mui/material/Tooltip';
import { DashboardIcon } from '@radix-ui/react-icons'


function StudentLayout() {
  const { auth } = useAuth()
  return (
    <>
        <header className='flex px-4 my-2 items-end gap-2 h-1/6'>
            <h2 className='font-bold text-2xl mr-auto'>Student</h2>
            <UserNav/>
        </header>
        <Separator className="my-3 mx-3 w-auto"/>
        <main className='grid sm:grid-cols-[88px,auto,1fr] md:grid-cols-[160px,auto,1fr] auto-rows-auto h-5/6'>
          <div className='grid sm:auto-rows-min sm:grid-cols-1 grid-cols-5 p-5 gap-5 sticky top-0 self-start sm:bg-transparent bg-zinc-900 z-10'>

            <Tooltip title="Dashboard">
              <Link to={`/${auth.user.role}/dashboard`} className="hover:text-slate-300">
                <div className='flex items-center justify-start gap-4'>
                  <DashboardIcon className='size-6 w-full md:size-5'/>
                  <h3 className="hidden md:inline">Dashboard</h3>
                </div>
              </Link>
            </Tooltip>

            <Tooltip title="Attendance">
              <Link to={`/${auth.user.role}/attendance`} className="hover:text-slate-300">
                <div className='flex items-center justify-start gap-4'>
                  <LiaUserCheckSolid className="size-6 w-full md:size-5"/>
                  <h3 className="hidden md:inline">Attendance</h3>
                </div>
              </Link>
            </Tooltip>

            <Tooltip title="Results">
              <Link to={`/${auth.user.role}/results`} className="hover:text-slate-300">
                <div className='flex items-center justify-start gap-4'>
                  <PiExam className="size-6 w-full md:size-5"/>
                  <h3 className="hidden md:inline">Results</h3>
                </div>
              </Link>
            </Tooltip>

            <Tooltip title="Dues">
              <Link to={`/${auth.user.role}/dues`} className="hover:text-slate-300">
                <div className='flex items-center justify-start gap-4'>
                  <PiMoney className="size-6 w-full md:size-5"/>
                  <h3 className="hidden md:inline">Dues</h3>
                </div>
              </Link>
            </Tooltip>

            <Tooltip title="Leaves">
              <Link to={`/${auth.user.role}/leaves`} className="hover:text-slate-300">
                <div className='flex items-center justify-start gap-4'>
                  <TbCalendarX className="size-6 w-full md:size-5"/>
                  <h3 className="hidden md:inline">Leaves</h3>
                </div>
              </Link>
            </Tooltip>

          </div>
          <Separator orientation="vertical" decorative />
          <Outlet/>
        </main>
    </>
  )
}

export default StudentLayout