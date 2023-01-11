import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './EmployeeList.css'


function EmployeeList() {
    const [employee, setEmployee] = useState([])
    let navigate = useNavigate();

    useEffect(() => {
        getDataFromServer();
    }, [])

    //fetch data from database
    const getDataFromServer = async () => {
        const response = await axios.get("http://localhost:8080/api/v1/employees")
        if(response && response.data){
            setEmployee(response.data)
        }
    }    

    //delete data from database
    const deleteData = async (id) => {
        const response = await axios.delete(`http://localhost:8080/api/v1/employees/${id}`)
        if(response){
            getDataFromServer();
        }
    }

    //Update data in database
    const updateData = (id) => {
        // const data = employee.find(emp => emp.id === id)
        navigate(`/addEmployee/${id}`)
    }

  return (
    <div className="employeeList">
        <table>
            <thead>
                <tr>
                    <th>Id</th>
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
                                <td>{data.id}</td>
                                <td>{data.firstName}</td>
                                <td>{data.lastName}</td>
                                <td>{data.emailId}</td>
                                <td>
                                    <button onClick={() => updateData(data.id)}>Update</button>
                                    <button onClick={() => deleteData(data.id)}>Delete</button>
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