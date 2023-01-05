import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './AddEmployee.css'


function AddEmployee() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailId, setEmailId] = useState("")

  let navigate = useNavigate()

  const addEmployee = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:8080/api/v1/employees",
    {
      "firstName": firstName,
      "lastName": lastName,
      "emailId": emailId
    })
    if(response){
      navigate("/")
    }
  }

  return (
    <div className="addEmployee">
        <h1>Add New Employee</h1>
        <form onSubmit={addEmployee}>
          <label>First Name:
            <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
          </label>
          <label>Last Name:
            <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
          </label>
          <label>Email:
            <input type="email" name="email" value={emailId} onChange={(e) => setEmailId(e.target.value)} required/>
          </label>
          <button type="submit">Add Employee</button>
        </form>
    </div>
  )
}

export default AddEmployee