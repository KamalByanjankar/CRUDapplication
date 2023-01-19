import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EmployeeList.css'
import { useNavigate } from 'react-router-dom';

import Modal from "react-modal";


function EmployeeList() {
    const [employee, setEmployee] = useState([])
    const [filteredEmployee, setFilteredEmployee] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState("")

    const navigate = useNavigate()
     
    useEffect(() => {
        getDataFromServer()
    }, [])

    //fetch data from database
    const getDataFromServer = async () => {
        const response = await axios.get("http://localhost:8080/api/v1/employees")
        // toast.success('Loading...', {
        //     position: toast.POSITION.TOP_RIGHT
        // })
        if(response && response.data){
            setEmployee(response.data)
            setFilteredEmployee(response.data)
        }
    }   

    const cancelHandler = () => {
        setIsOpen(false)
    }

    //pop up confirmation box to delete
    const openPopUp = (data) => {
        setData(data)
        setIsOpen(true)
    }

    //delete data after confirmation
    const deleteDatafromDatabase = async (id) => {
        const response = await axios.delete(`http://localhost:8080/api/v1/employees/${id}`)
        setIsOpen(false)
        if(response){
            const timer = setTimeout(() => {
                toast.success('Employee with id ' + id + ' has been deleted', {
                    position: toast.POSITION.TOP_RIGHT
                })    
                    getDataFromServer();
                }, 2000);
                toast.success('Deleting id ' + id + ' ... ', {
                    position: toast.POSITION.TOP_RIGHT
                })
            return () => clearTimeout(timer); 
        }


        //removes data from list but not from db
        // const newUserList = employee.filter((user) => user.id !== id)
        // setEmployee(newUserList)
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
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={cancelHandler}
                        contentLabel="My dialog"
                        ariaHideApp={false}
                        className="employeeList__deleteModal"
                        overlayClassName="employeeList__deleteModal__overlay"
                    >
                        <p>Do you want to delete id {data.id}?</p>
                        <div className="employeelist__modalbtn">
                            <button onClick={() => deleteDatafromDatabase(data.id)}>Yes</button>
                            <button onClick={cancelHandler}>Cancel</button>  
                        </div>  
                    </Modal>
                </table>
            ) : (
                <h1>No Employees found!</h1>
            )
        }        
    </div>
  )
}

export default EmployeeList