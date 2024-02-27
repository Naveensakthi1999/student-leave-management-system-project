import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Employee from './Components/Employee'
import Category from './Components/Category'
import Profile from './Components/Profile'
import AddCategory from './Components/AddCategory'
import AddEmployee from './Components/AddEmployee'
import EditEmployee from './Components/EditEmployee'
import Start from './Components/Start'
import StudentLogin from './Components/StudentLogin'
import StudentDetail from './Components/StudentDetail'
import PrivateRoute from './Components/PrivateRoute'
import Student from './Components/Student'
import Department from './Components/Department'
import AddDepartment from './Components/AddDepartment'
import AddStudent from './Components/AddStudent'
import EditStudent from './Components/EditStudent'
import LeaveList from './Components/LeaveList'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Start />}></Route>
      <Route path='/adminlogin' element={<Login />}></Route>
      <Route path='/student_login' element={<StudentLogin />}></Route>
      <Route path='/student_detail/:id' element={<StudentDetail />}></Route>
      <Route path='/dashboard' element={
        <PrivateRoute >
          <Dashboard />
        </PrivateRoute>
      }>
        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/employee' element={<Employee />}></Route>
        <Route path='/dashboard/category' element={<Category />}></Route>
        <Route path='/dashboard/profile' element={<Profile />}></Route>
        <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
        <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
        <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
        <Route path='/dashboard/Department' element={<Department />}></Route>
        <Route path='/dashboard/add_department' element={<AddDepartment />}></Route>
        <Route path='/dashboard/Student' element={<Student />}></Route>
        <Route path='/dashboard/add_student' element={<AddStudent />}></Route>
        <Route path='/dashboard/edit_student/:id' element={<EditStudent />}></Route>
        <Route path='/dashboard/leave_list' element={<LeaveList />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
