import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddEmployee.css'


function AddEmployee() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailId, setEmailId] = useState("")
  const params = useParams()

  const id = params.id;

  let navigate = useNavigate()

  useEffect(() => {
    if(id === '_add'){
      return 
    }
    else{
      //get data from database of certain id
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

  const addUpdateEmployee = async (e) => {
    let response;
    e.preventDefault();

    if(id !== '_add'){
      //update data and save in database
      response = await axios.put(`http://localhost:8080/api/v1/employees/${id}`,
      {
        "firstName":firstName,
        "lastName": lastName,
        "emailId": emailId
      })
    }

    else{
      //post new data in database
      response = await axios.post("http://localhost:8080/api/v1/employees",
      {
        "firstName": firstName,
        "lastName": lastName,
        "emailId": emailId
      })
    }
    
    if(response){
      navigate("/")
    }
  }

  return (
    <div className="addEmployee">
        <h1>{ id === '_add' ? 'Add New Employee' : 'Update Employee'}</h1>
        <form onSubmit={addUpdateEmployee}>
          <label>First Name:
            <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
          </label>
          <label>Last Name:
            <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
          </label>
          <label>Email:
            <input type="email" name="email" value={emailId} onChange={(e) => setEmailId(e.target.value)} required/>
          </label>
          <div className="addEmployee__button">
            <button type="submit">
              { 
                id === '_add' ? 'Add Employee' : 'Update Employee'
              }
            </button>
            <button type="submit" onClick={()=>navigate("/")}>Cancel</button>
          </div>
        </form>
    </div>
  )
}

export default AddEmployee