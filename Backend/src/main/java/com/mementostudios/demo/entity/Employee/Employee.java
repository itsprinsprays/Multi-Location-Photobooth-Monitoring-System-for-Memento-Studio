package com.mementostudios.demo.entity.Employee;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.mementostudios.demo.entity.BoothAssignment;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Employee")
public class Employee {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "employee_id")
	private Integer employeeId;
	
	@Column(name = "employee_name", nullable = false)
	private String employeeName;
	
	@Column(name = "username", nullable = false, unique = true)
	private String username;
	
	@Column(name = "email", nullable = false, unique = true)
	private String email;
	
	@Column(name = "contact_number")
	private String contactNumber;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "employee_status",nullable = false)
	private EmployeeStatus employeeStatus = EmployeeStatus.ACTIVE;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "employee_roles", nullable = false)
	private EmployeeRole employeeRole;
	
	@CreationTimestamp
	@Column(name = "creation_date", updatable = false)
	private LocalDate creationDate;
	
	@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<BoothAssignment> assignments = new ArrayList<>();
	
	public Employee() { }
	// Getters
	public Integer getEmployeeId() { return employeeId; }
	public String getEmployeeName() { return employeeName; }
	public String getUsername() { return username; }
	public String getEmail() { return email; }
	public String getContactNumber() { return contactNumber; }
	public EmployeeStatus getEmployeeStatus() { return employeeStatus; }
	public EmployeeRole getEmployeeRole() { return employeeRole; }
	public LocalDate getCreationDate() { return creationDate; }
	public List<BoothAssignment> getAssignments() { return assignments; }
	
	// Setters
	public void setEmployeeId(Integer employeeId) { this.employeeId = employeeId; }
	public void setEmployeeName(String employeeName) { this.employeeName = employeeName; }
	public void setUsername(String username) { this.username = username; }
	public void setEmail(String email) { this.email = email; }
	public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
	public void setEmployeeStatus(EmployeeStatus employeeStatus) { this.employeeStatus = employeeStatus; }
	public void setEmployeeRole(EmployeeRole employeeRole) { this.employeeRole = employeeRole; }
	public void setCreationDate(LocalDate creationDate) { this.creationDate = creationDate; }
	public void setAssignments(List<BoothAssignment> assignments) { this.assignments = assignments; }

}
