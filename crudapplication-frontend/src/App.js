import './App.css';
import Navbar from './components/Navbar/navbar';
import EmployeeList from './components/EmployeeList/EmployeeList';
import AddEmployee from './components/AddEmployee/AddEmployee';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/addEmployee/:id" element={<AddEmployee />} />
        </Routes>
        <ToastContainer autoClose={3000} theme="colored" newestOnTop={true}/>
      </Router>
    </div>
  );
}

export default App;
