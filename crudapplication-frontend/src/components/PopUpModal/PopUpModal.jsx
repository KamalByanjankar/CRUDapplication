import React from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import { toast } from 'react-toastify';
import './PopUpModal.css'

function PopUpModal({getDataFromServer, id, isOpen, setIsOpen}) {

    const cancelHandler = () => {
        setIsOpen(false)
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

  return (
    <div>
        <Modal
            isOpen={isOpen}
            onRequestClose={cancelHandler}
            contentLabel="My dialog"
            ariaHideApp={false}
            className="popUp__deleteModal"
            overlayClassName="popUp__deleteModal__overlay"
        >
            <p>Do you want to delete id {id}?</p>
            <div className="popUp__modalbtn">
                <button onClick={() => deleteDatafromDatabase(id)}>Yes</button>
                <button onClick={cancelHandler}>Cancel</button>  
            </div>  
        </Modal>
    </div>
  )
}

export default PopUpModal