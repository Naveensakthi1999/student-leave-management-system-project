import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Category = () => {

    const [category, setCategory] = useState([])

    useEffect(()=> {
        axios.get('http://localhost:3000/auth/category')
        .then(result => {
            if(result.data.Status) {
                setCategory(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3000/auth/delete_category/'+id)
        .then(result => {
            if(result.data.Status) {
                window.location.reload()
            } else {
                alert(result.data.Error)
            }
        })
    } 

  return (
    <div className='px-5 mt-3'>
        <div className='d-flex justify-content-center'>
            <h3>Category List</h3>
        </div>
        <Link to="/dashboard/add_category" className='btn btn-success'>Add Category</Link>
        <div className='mt-3'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Tutor</th>
                        <th>Warden</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        category.map(c => (
                            <tr key={c}>
                                <td>{c.name}</td>
                                <td>
                                    { c.tutor === 'true' ? 
                                    <button className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faCheck} /></button> : 
                                    <button className="btn btn-danger btn-sm"><FontAwesomeIcon icon={faTimes} /></button> 
                                    }
                                </td>
                                <td>
                                   { c.warden === 'true' ? 
                                    <button className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faCheck} /></button> : 
                                    <button className="btn btn-danger btn-sm"><FontAwesomeIcon icon={faTimes} /></button> 
                                    }
                                </td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() => handleDelete(c.id)}
                                    >
                                    Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default Category