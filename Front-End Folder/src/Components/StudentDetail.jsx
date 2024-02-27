import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AddLeave from './AddLeave'
import Leave from './Leave'


const studentDetail = () => {
    const [student, setStudent] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3000/student/detail/'+id)
        .then(result => {
            setStudent(result.data[0])
        })
        .catch(err => console.log(err))
    }, [])
    const handleLogout = () => {
        axios.get('http://localhost:3000/student/logout')
        .then(result => {
          if(result.data.Status) {
            localStorage.removeItem("valid")
            navigate('/')
          }
        }).catch(err => console.log(err))
      }
  return (
    <div style={{paddingLeft: '50px', paddingRight: '50px'}}>
        <div className="p-2 d-flex justify-content-center shadow">
            <h4>Employee Management System</h4>
        </div>
        <div className='row'>
        <div className='col-4'>
        <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
            <img src={`http://localhost:3000/Images/`+student.image} className='emp_det_image'/>
            <div className='d-flex align-items-start flex-column mt-5'>
                <h3>Name: {student.name}</h3>
                <h3>Email: {student.email}</h3>
                <h3>Phone No: {student.phone}</h3>
            </div>
        <div> 
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        </div>
        </div>
        </div>
        <div className='col-8 mt-5'>
        <div className='row'>
            <div className='col-12'>
            <AddLeave id={id}/>
            </div>
            <div className='col-12'>
            <Leave s_id={id}/>
            </div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default studentDetail