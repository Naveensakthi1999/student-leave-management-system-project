import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddCategory = () => {
    const [category, setCategory] = useState()
    const [tutor, setTutor] = useState(false)
    const [warden, setWarden] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/auth/add_category', {category ,tutor ,warden })
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/category')
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
        <div className='p-3 rounded w-25 border'>
            <h2>Add Category</h2>
            <form className="row g-1" onSubmit={handleSubmit}>
                <div className="col-12 mt-3">
                <label htmlFor="category"><strong>Category:</strong></label>
                <input type="text" name='category' placeholder='Enter Category'
                     onChange={(e) => setCategory(e.target.value)} className='form-control rounded-0'/>
                </div>
                <div className="col-12 mt-3">
                <label htmlFor="Permission select"><strong>Permission select:</strong></label>
                <div className="row">
                <div className="col-6">
                    <div className="form-check">
                        <input className="form-check-input border-2 border-dark" type="checkbox" 
                        onChange={(e) => setTutor(e.target.value)} 
                        defaultValue id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Tutor 
                        </label>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-check">
                        <input className="form-check-input border-2 border-dark" type="checkbox" 
                        onChange={(e) => setWarden(e.target.value)} 
                         defaultValue id="flexCheckChecked" />
                        <label className="form-check-label" htmlFor="flexCheckChecked">
                            Warden
                        </label>
                    </div>
                </div>
                </div>
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2 mt-3'>Add Category</button>
            </form>
        </div>
    </div>
  )
}

export default AddCategory