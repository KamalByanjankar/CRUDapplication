package com.CRUDapplication.springboot.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.CRUDapplication.springboot.exception.ResourceNotFoundException;
import com.CRUDapplication.springboot.model.Employee;
import com.CRUDapplication.springboot.repository.EmployeeRepository;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	//get all Employees
	@GetMapping("/employees")
	public List<Employee> getAllEmployees(){
		return employeeRepository.findAll();
	}
	
	//get Employees using id
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee>	 getEmployee(@PathVariable Long id) {
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User with id " + id + " not found"));
		return ResponseEntity.ok(employee);
	}
	
	//post new Employees
	@PostMapping("/employees")
	@ResponseStatus(HttpStatus.CREATED)
	public Employee addEmployee(@RequestBody Employee employee) {
		Employee newEmployee = employeeRepository.save(employee);
		return newEmployee;
	}
	
	//Update existing Employees
	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee, @PathVariable Long id) {
		Employee updateEmployee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee with id " + id + " not found"));
		updateEmployee.setFirstName(employee.getFirstName());
		updateEmployee.setLastName(employee.getLastName());
		updateEmployee.setEmailId(employee.getEmailId());
		Employee updatedEmployee = employeeRepository.save(updateEmployee);
		return ResponseEntity.ok(updatedEmployee);
	}

	//Delete Employees
	@DeleteMapping("/employees/{id}")
	public Employee deleteEmployee(@PathVariable("id") Long id) {
		Optional<Employee> employeeToDelete = employeeRepository.findById(id);
		if(!employeeToDelete.isPresent()) {
			return null;
		}
		Employee deleteEmployee = employeeToDelete.get();
		this.employeeRepository.delete(deleteEmployee);
		return deleteEmployee;
	}
	
	//Delete all Employees
	@DeleteMapping("/employees/all")
	public void deleteAllEmployees() {
		employeeRepository.deleteAll();
	}
	
}
