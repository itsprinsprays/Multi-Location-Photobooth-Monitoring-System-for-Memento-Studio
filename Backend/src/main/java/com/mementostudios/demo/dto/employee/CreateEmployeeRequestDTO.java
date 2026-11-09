package com.mementostudios.demo.dto.employee;

import com.mementostudios.demo.entity.Employee.EmployeeRole;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class CreateEmployeeRequestDTO {
	
	@NotBlank(message = "Employee Name is required" )
	private String employeeName;
	
	@NotBlank(message = "Username is required")
	private String username;
	
	@Email(message = "Invalid email format")
	@NotBlank(message = "email is required")
	private String email;
	
	@NotBlank(message = "Contact number is required")
	@Pattern(regexp = "^09\\d{9}$", message = "Contact number must be an 11-digit mobile number starting with 09")
	private String contactNumber;
	
	@NotNull(message = "Employee Role is required")
	private EmployeeRole employeeRole;
	
	public CreateEmployeeRequestDTO() {}
	
	// Getters and Setters
	public String getEmployeeName() { return employeeName; }
	public void setEmployeeName(String employeeName) { this.employeeName = employeeName; }
	
	public String getUsername() { return username; }
	public void setUsername(String username) { this.username = username; }
	
	public String getEmail() { return email; }
	public void setEmail(String email) { this.email = email; }
	
	public String getContactNumber() { return contactNumber; }
	public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
	
	public EmployeeRole getEmployeeRole() { return employeeRole; }
	public void setEmployeeRole(EmployeeRole employeeRole) { this.employeeRole = employeeRole; }

}
