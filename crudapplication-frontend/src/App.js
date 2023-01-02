import './App.css';
import EmployeeList from './components/EmployeeList/EmployeeList';
import Navbar from './components/Navbar/navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          {/* <Route path="/addEmployee" component={AddEmployee} */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
