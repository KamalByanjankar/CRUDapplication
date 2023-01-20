import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EmployeeList.css'
import { useNavigate } from 'react-router-dom';
import PopUpModal from '../PopUpModal/PopUpModal';


function EmployeeList() {
    const [employee, setEmployee] = useState([])
    const [filteredEmployee, setFilteredEmployee] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState("")
    const navigate = useNavigate()

     
    //fetche data from database
    useEffect(() => {
        getDataFromServer()
    }, [])

    const getDataFromServer = async () => {
        const response = await axios.get("http://localhost:8080/api/v1/employees")
        if(response && response.data){
            setEmployee(response.data)
            setFilteredEmployee(response.data)
        }
    }   

    //pop up confirmation box to delete
    const openPopUp = (data) => {
        setData(data)
        setIsOpen(!isOpen)
    }

    //Update data in database
    const updateData = (id) => {
        // const data = employee.find(emp => emp.id === id)
        toast.success(`Update Employee with id ${id}!`, {
            position: toast.POSITION.TOP_RIGHT
        })
        navigate(`/addEmployee/${id}`)
    }

    //search employee 
    const searchEmployee = (e) => {
        const keyword = e.target.value.toLowerCase();

        if (keyword !== ''){
            const timer = setTimeout(() => {
                const searchResult = employee.filter((emp) => {
                    return emp.firstName.toLowerCase().startsWith(keyword) || emp.lastName.toLowerCase().startsWith(keyword)
                })
                setFilteredEmployee(searchResult)
            }, 500);  
            return () => clearTimeout(timer);
        }
        else{
            const timer = setTimeout(() => {
                getDataFromServer();
            }, 500);
            return () => clearTimeout(timer);   
        }
    }

  return (
    <div className="employeeList">
        <div className="employeeList__search">
            <input 
                type="search" 
                value={employee.firstName} 
                className="search__input" 
                placeholder='Search an Employee'
                onChange={searchEmployee}
            />
        </div>
        {
            filteredEmployee && filteredEmployee.length > 0 ? (
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
                        filteredEmployee.map((data) => {
                            return(
                                <tbody key={data.id}>
                                    <tr>
                                        <td>{data.id}</td>
                                        <td>{data.firstName}</td>
                                        <td>{data.lastName}</td>
                                        <td>{data.emailId}</td>
                                        <td>
                                            <button onClick={() => updateData(data.id)}>Update</button>
                                            <button onClick={() => openPopUp(data)}>Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })
                    }
                </table>
            ) : (
                <h1>No Employees found!</h1>
            )
        }  
        <PopUpModal 
            getDataFromServer={getDataFromServer}
            id={data.id}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        />

    </div>
  )
}

export default EmployeeList