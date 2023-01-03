import './App.css';
import Navbar from './components/Navbar/navbar';
import EmployeeList from './components/EmployeeList/EmployeeList';
import AddEmployee from './components/AddEmployee/AddEmployee';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
