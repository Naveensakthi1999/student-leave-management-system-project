import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Leave = ({s_id}) => {

    const [leave, setLeave] = useState([])

    useEffect(()=> {
        axios.get('http://localhost:3000/student/leave/'+s_id)
        .then(result => {
            if(result.data.Status) {
                setLeave(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }, [])

    const handleCancel = (id) => {
        axios.put('http://localhost:3000/student/cancel_leave/'+id)
        .then(result => {
            if(result.data.Status) {
                window.location.reload()
            } else {
                alert(result.data.Error)
            }
        })
    } 

  return (
    <div className='mt-3' style={{width : '100%'}}>
        <div className='d-flex justify-content-start'>
            <h3>Leave List</h3>
        </div>
        <div className='mt-3'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        leave.map(c => (
                            <tr key={c}>
                                <td>{c.name}</td>
                                <td>{new Date(c.from_date).toLocaleDateString('en-GB')}</td>
                                <td>{new Date(c.to_date).toLocaleDateString('en-GB')}</td>
                                <td>{c.status}</td>
                                <td>
                                    {c.status == 'Pending' &&
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleCancel(c.id)}
                                    >
                                    Cancelled
                                    </button> }
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

export default Leave