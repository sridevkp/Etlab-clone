import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingLayout from "./layout/LandingLayout"
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLayout from './layout/AdminLayout';
import StudentLayout from './layout/StudentLayout';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingLayout/>} >
          <Route path='login' element={<Login/>} />
          <Route path='register' element={<Register/>} />
      </Route>
      
      <Route element={<RequireAuth/>}>

        <Route path="/students" element={<StudentLayout/>} >
            <Route path='dashboard' element={<Dashboard/>} />
            <Route path='attendance' element={<Attendance/>} />
        </Route>
        
        <Route path="/admin" element={<AdminLayout/>}>
            <Route path='dashboard' element={<Dashboard/>} />
        </Route>

      </Route>
      
      
      {/* <Route path="parents" element={<StudentLayout/>}></Route> */}

    </Routes>
  );
}

export default App;
