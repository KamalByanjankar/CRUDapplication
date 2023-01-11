import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import './AddEmployee.css'


function AddEmployee() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailId, setEmailId] = useState("")
  const params = useParams()

  const id = params.id;

  let navigate = useNavigate()

  useEffect(() => {
    if(id === '-1'){
      return 
    }
    else{
      const getDataFromServerUsingId = async () => {
        let response = await axios.get(`http://localhost:8080/api/v1/employees/${id}`)
        let employee = response.data
        setFirstName(employee.firstName)
        setLastName(employee.lastName)
        setEmailId(employee.emailId)
      }
      getDataFromServerUsingId()
    }
  }, [id])

  const addEmployee = async (e) => {
    let response;
    e.preventDefault();

    if(id !== '-1'){
      response = await axios.put(`http://localhost:8080/api/v1/employees/${id}`,
      {
        "firstName":firstName,
        "lastName": lastName,
        "emailId": emailId
      })
      if(response){
        navigate("/")
      }
    }

    if(id === '-1'){
      response = await axios.post("http://localhost:8080/api/v1/employees",
      {
        "firstName": firstName,
        "lastName": lastName,
        "emailId": emailId
      })
      if(response){
        navigate("/")
      }
    }
    else{
      return
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