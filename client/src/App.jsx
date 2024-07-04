import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import useAuth from './hooks/useAuth';

import AdminLayout from './layout/AdminLayout';
import StudentLayout from './layout/StudentLayout';
import LandingLayout from "./layout/LandingLayout";

import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Results from './pages/Results';
import Inbox from './pages/Inbox';
import Login from './pages/Login';
import Fee from './pages/Fee';
import Leaves from './pages/Leaves';
import FilenotFound from './pages/FilenotFound';
import Register from './pages/Register';
import UnAuthorized from './pages/UnAuthorized';
import Profile from './pages/Profile';

import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';

//todo : lazy load pages suspense

const ROLES = { 
  STUDENT : "students",
  ADMIN : "admins",
  PARENT: "parents"
}

function App() {
  const location = useLocation()

  return (
    <Routes location={location} key={location.pathname}>
      <Route path='/' element={<LandingLayout/>} >
          <Route index element={<HomeNavigator/>} />
          <Route path='login' element={<Login/>} />
          <Route path='register' element={<Register/>} />
          <Route path='unauthorized' element={<UnAuthorized/>} />
      </Route>
      
      <Route element={<PersistLogin/>}>
        <Route element={<RequireAuth roles={[ ROLES.STUDENT ]}/>}>
          <Route path="/students" element={<StudentLayout/>} >
              <Route path='dashboard' element={<Dashboard/>} />
              <Route path='profile' element={<Profile/>} />
              <Route path='attendance' element={<Attendance/>} />
              <Route path='results' element={<Results/>} />
              <Route path='inbox' element={<Inbox/>} />
              <Route path='dues' element={<Fee/>} />
              <Route path='leaves' element={<Leaves/>} />
          </Route>
        </Route>
          
        <Route element={<RequireAuth roles={[ ROLES.ADMIN ]}/>}>
          <Route path="/admins" element={<AdminLayout/>}>
              <Route path='dashboard' element={<Dashboard/>} />
              <Route path='profile' element={<Profile/>} />
          </Route>
        </Route>
      </Route>
      
      <Route path='/*' element={<FilenotFound/>}/>
      
      {/* <Route path="parents" element={<StudentLayout/>}></Route> */}

    </Routes>
  );
}
function HomeNavigator() {
  const { auth } = useAuth()
  return (
    auth?.role
      ?<Navigate to={`/${auth.user.role}/dashboard`} />
      :<Navigate to="/login"/>
  )
}

export default App;
