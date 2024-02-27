import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AddLeave = ({id}) => {
    const [leave, setLeave] = useState({
        category_id: "",
        from: "",
        to: "",
        student_id: id,
    })
    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios
          .get("http://localhost:3000/auth/category")
          .then((result) => {
            if (result.data.Status) {
                setCategory(result.data.Result);
            } else {
              alert(result.data.Error);
            }
          })
          .catch((err) => console.log(err));
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/student/add_leave', {leave})
        .then(result => {
            if(result.data.Status) {
                window.location.reload()
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }

  return (
    <div style={{width : '100%'}}>
        <div className='p-3 rounded border'>
            <h2>Leave Request</h2>
            <form className="g-1" onSubmit={handleSubmit}>
                <div className='row'>
                <div className="col-4 mt-3">
                <label htmlFor="category"><strong>category :</strong></label>
                    <select name="category" id="category" className="form-select"
                        onChange={(e) => setLeave({...leave, category_id: e.target.value})}>
                    <option value="">Select category</option>
                    {category.map((c) => {
                        return <option value={c.id}>{c.name}</option>;
                    })}
                    </select>
                </div>
                <div className="col-4 mt-3">
                <label htmlFor="category"><strong>From date :</strong></label>
                    <input
                    type="date"
                    className="form-control rounded-0"
                    id="inputFrom"
                    onChange={(e) =>
                        setLeave({ ...leave, from: e.target.value })
                    }
                    />
                </div>
                <div className="col-4 mt-3">
                <label htmlFor="category"><strong>To Date :</strong></label>
                    <input
                    type="date"
                    className="form-control rounded-0"
                    id="inputTo"
                    onChange={(e) =>
                        setLeave({ ...leave, to: e.target.value })
                    }
                    />
                </div>
                </div>
                <div className="w-25">
                <button className='btn btn-success w-100 rounded-0 mb-2 mt-3'>Leave Request</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddLeave