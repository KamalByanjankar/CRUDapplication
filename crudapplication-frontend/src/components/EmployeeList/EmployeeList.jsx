import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './EmployeeList.css'

function EmployeeList() {
    const [employee, setEmployee] = useState([])

    const getDataFromServer = async () => {
        const response = await axios.get("http://localhost:8080/api/v1/employees")
        if(response && response.data){
            setEmployee(response.data)
        }
    }
    
    useEffect(() => {
        getDataFromServer();
    }, [])

  return (
    <div className="employeeList">
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            {
                employee.map((data) => {
                    return(
                        <tbody key={data.id}>
                            <tr>
                                <td>{data.firstName}</td>
                                <td>{data.lastName}</td>
                                <td>{data.emailId}</td>
                                <td>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    )
                })
            }
        </table>
    </div>
  )
}

export default EmployeeList