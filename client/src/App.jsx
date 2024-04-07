import { Routes, Route, Navigate } from 'react-router-dom';
import LandingLayout from "./layout/LandingLayout"
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Login from './pages/Login';
import FilenotFound from './pages/FilenotFound';
import Register from './pages/Register';
import UnAuthorized from './pages/UnAuthorized';
import AdminLayout from './layout/AdminLayout';
import StudentLayout from './layout/StudentLayout';
import RequireAuth from './components/RequireAuth';
import useAuth from './hooks/useAuth';

//todo : lazy load pages suspense

const ROLES = { 
  STUDENT : "students",
  ADMIN : "admins",
  PARENT: "parents"
}

function App() {

  return (
    <Routes>
      <Route path='/' element={<LandingLayout/>} >
          <Route index element={<HomeNavigator/>} />
          <Route path='login' element={<Login/>} />
          <Route path='register' element={<Register/>} />
          <Route path='unauthorized' element={<UnAuthorized/>} />
      </Route>
      
      <Route element={<RequireAuth roles={[ ROLES.STUDENT ]}/>}>
        <Route path="/students" element={<StudentLayout/>} >
            <Route path='dashboard' element={<Dashboard/>} />
            <Route path='attendance' element={<Attendance/>} />
        </Route>
      </Route>
        
      <Route element={<RequireAuth roles={[ ROLES.ADMIN ]}/>}>
        <Route path="/admins" element={<AdminLayout/>}>
            <Route path='dashboard' element={<Dashboard/>} />
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
    auth?.user
      ?<Navigate to={`/${auth.user.role}/dashboard`} />
      :<Navigate to="/login"/>
  )
}

export default App;
