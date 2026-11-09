package com.mementostudios.demo.dto.employee;

import java.time.LocalDate;

import com.mementostudios.demo.entity.Employee.EmployeeRole;
import com.mementostudios.demo.entity.Employee.EmployeeStatus;

public class EmployeeResponseDTO {
	
	private Integer employeeId;
	private String employeeName;
	private String username;
	private String email;
	private String contactNumber;
	private EmployeeStatus employeeStatus;	
	private EmployeeRole employeeRole;		
	private LocalDate creationDate;

	public EmployeeResponseDTO(Integer employeeId, String employeeName, String username, String email, 
			String contactNumber, EmployeeStatus employeeStatus, EmployeeRole employeeRole, LocalDate creationDate ) { 
			
		this.employeeId = employeeId;
		this.employeeName = employeeName;
		this.username = username;
		this.email = email;
		this.contactNumber = contactNumber;
		this.employeeStatus = employeeStatus;
		this.employeeRole = employeeRole;
		this.creationDate = creationDate;
	}
	// Getters
	public Integer getEmployeeId() { return employeeId; }
	public String getEmployeeName() { return employeeName; }
	public String getUsername() { return username; }
	public String getEmail() { return email; }
	public String getContactNumber() { return contactNumber; }
	public EmployeeStatus getEmployeeStatus() { return employeeStatus; }
	public EmployeeRole getEmployeeRole() { return employeeRole; }
	public LocalDate getCreationDate() { return creationDate; }
	
	// Setters
	public void setEmployeeId(Integer employeeId) { this.employeeId = employeeId; }
	public void setEmployeeName(String employeeName) { this.employeeName = employeeName; }
	public void setUsername(String username) { this.username = username; }
	public void setEmail(String email) { this.email = email; }
	public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
	public void setEmployeeStatus(EmployeeStatus employeeStatus) { this.employeeStatus = employeeStatus; }
	public void setEmployeeRole(EmployeeRole employeeRole) { this.employeeRole = employeeRole; }
	public void setCreationDate(LocalDate creationDate) { this.creationDate = creationDate; }
}
