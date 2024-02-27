import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const [student, setStudent] = useState({
    rollno: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    department: "",
    image: "",
  });
  const [department, setDepartment] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/department")
      .then((result) => {
        if (result.data.Status) {
          setDepartment(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('rollno', student.rollno);
    formData.append('name', student.name);
    formData.append('email', student.email);
    formData.append('password', student.password);
    formData.append('address', student.address);
    formData.append('phone', student.phone);
    formData.append('image', student.image);
    formData.append('department', student.department);

    axios.post('http://localhost:3000/auth/add_student', formData)
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/student')
        } else {
            alert(result.data.Error)
        }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Student</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputrollno" className="form-label">
             Roll No.
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputrollno"
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
              onChange={(e) =>
                setStudent({ ...student, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e) =>
                setStudent({ ...student, password: e.target.value })
              }
            />
            <label for="inputphone" className="form-label">
              Phone No
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputphone"
              placeholder="Enter Phone No"
              autoComplete="off"
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
              onChange={(e) =>
                setStudent({ ...student, address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="Department" className="form-label">
             Department
            </label>
            <select name="department" id="department" className="form-select"
                onChange={(e) => setStudent({...student, department: e.target.value})}>
              <option value="">Select Department</option>
              {department.map((c) => {
                return <option value={c.name}>{c.name}</option>;
              })}
            </select>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" for="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={(e) => setStudent({...student, image: e.target.files[0]})}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
