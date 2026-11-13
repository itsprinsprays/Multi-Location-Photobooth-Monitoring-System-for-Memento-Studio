package com.mementostudios.demo.dto.employee;

import com.mementostudios.demo.entity.Employee.EmployeeRole;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;

public class UpdateEmployeeInfoRequestDTO {
	
	private String employeeName;
	
	@Email(message = "Invalid email format")
	private String email;
	
	@Pattern(regexp = "^09\\d{9}$", message = "Contact number must be an 11-digit mobile number starting with 09")
	private String contactNumber;
	
	private EmployeeRole employeeRole;
	
	public UpdateEmployeeInfoRequestDTO() {}
	
	public String getEmployeeName() { return employeeName; }
	public String getEmail() { return email; }
	public String getContactNumber() { return contactNumber; }
	public EmployeeRole getEmployeeRole() { return employeeRole; }
	
	public void setEmployeeName(String employeeName) { this.employeeName = employeeName; }
	public void setEmail(String email) { this.email = email; }
	public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
	public void setEmployeeRole(EmployeeRole employeeRole) { this.employeeRole = employeeRole; }
	
	
}
