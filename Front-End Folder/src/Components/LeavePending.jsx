import React, { useEffect, useState } from "react";
import axios from "axios";

function LeavePending() {

    const [leave, setLeave] = useState([])
    const [type, setType] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3000/verify')
        .then(result => {
          if(result.data.Status) {
            setType(result.data.category);
          } else {
            alert(result.data.Error)
          }
        }).catch(err =>console.log(err))
      }, [])

    useEffect(() => {
        console.log(type);
        axios.get('http://localhost:3000/auth/pending_leave/', {
            params: { type: type } 
        })
        .then(result => {
            if (result.data.Status) {
                setLeave(result.data.Result);
            } else {
                alert(result.data.Error);
            }
        })
        .catch(err => console.error(err));
    }, [type]);
    
    const handleStatus = (id, status) => {
        axios.put(`http://localhost:3000/auth/status_leave/${id}`, { status, type })
            .then(result => {
                if (result.data.Status) {
                    window.location.reload();
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(error => {
                console.error(error);
            });
    };
     
  return (
    <div>
    <div className='mt-3'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Roll No</th>
                        <th>Student Name</th>
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
                                <td>{c.rollno}</td>
                                <td>{c.name}</td>
                                <td>{c.catname}</td>
                                <td>{new Date(c.from_date).toLocaleDateString('en-GB')}</td>
                                <td>{new Date(c.to_date).toLocaleDateString('en-GB')}</td>
                                <td>{c.status}</td>
                                <td>
                                    {c.status != 'Cancelled' && (
                                    <>
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => handleStatus(c.leave_id, 'Accepted')}
                                    >
                                    Accept
                                    </button>
                                    &nbsp;&nbsp;&nbsp;
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleStatus(c.leave_id, 'Rejected')}
                                    >
                                    Reject
                                    </button>
                                    </> )}
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

export default LeavePending