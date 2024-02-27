import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditStudent = () => {
    const {id} = useParams()
    const [student, setStudent] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        department: "",
      });
      const [department, setDepartment] = useState([]);
      const navigate = useNavigate()

      useEffect(()=> {
        axios.get('http://localhost:3000/auth/department')
        .then(result => {
            if(result.data.Status) {
                setDepartment(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))

        axios.get('http://localhost:3000/auth/student/'+id)
        .then(result => {
            setStudent({
                ...student,
                rollno: result.data.Result[0].rollno,
                name: result.data.Result[0].name,
                email: result.data.Result[0].email,
                address: result.data.Result[0].address,
                phone: result.data.Result[0].phone,
                department: result.data.Result[0].department,
            })
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_student/'+id, student)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/student')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
    console.log(student);
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Student</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
           <div className="col-12">
            <label for="inputrollno" className="form-label">
             Roll No.
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputrollno"
              value={student.rollno}
              placeholder="Enter Roll No"
              onChange={(e) =>
                setStudent({ ...student, rollno: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={student.name}
              onChange={(e) =>
                setStudent({ ...student, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              value={student.email}
              onChange={(e) =>
                setStudent({ ...student, email: e.target.value })
              }
            />
          </div>
          <div className='col-12'>
            <label for="inputSalary" className="form-label">
              Phone No
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputPhone"
              placeholder="Enter Phone No"
              autoComplete="off"
              value={student.phone}
              onChange={(e) =>
                setStudent({ ...student, phone: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              value={student.address}
              onChange={(e) =>
                setStudent({ ...student, address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="category" className="form-label">
              Category
            </label>
            <select name="category" id="category" className="form-select" value={student.department}
                onChange={(e) => setStudent({...student, department: e.target.value})}>
              {department.map((c) => {
                return <option value={c.name}>{c.name}</option>;
              })}
            </select>
          </div>
          
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Student
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditStudent