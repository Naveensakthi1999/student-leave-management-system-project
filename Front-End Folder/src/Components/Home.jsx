import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [departmentTotal, setDepartmentTotal] = useState(0)
  const [employeeTotal, setemployeeTotal] = useState(0)
  const [studentTotal, setStudentTotal] = useState(0)

  useEffect(() => {
    employeeCount();
    studentCount();
    departmentCount();
  }, [])

  const departmentCount = () => {
    axios.get('http://localhost:3000/auth/department_count')
    .then(result => {
      if(result.data.Status) {
        setDepartmentTotal(result.data.Result[0].department)
      }
    })
  }
  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
    .then(result => {
      if(result.data.Status) {
        setemployeeTotal(result.data.Result[0].employee)
      }
    })
  }
  const studentCount = () => {
    axios.get('http://localhost:3000/auth/student_count')
    .then(result => {
      if(result.data.Status) {
        setStudentTotal(result.data.Result[0].student)
      } else {
        alert(result.data.Error)
      }
    })
  }
  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Department</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{departmentTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Student</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{studentTotal}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home