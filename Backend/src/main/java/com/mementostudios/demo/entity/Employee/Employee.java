package com.mementostudios.demo.entity.Employee;

import java.util.ArrayList;
import java.util.List;

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
	
	@Enumerated(EnumType.STRING)
	@Column(name = "employee_status",nullable = false)
	private EmployeeStatus employeeStatus;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "employee_roles", nullable = false)
	private EmployeeRole employeeRole;
	
	@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<BoothAssignment> assignments = new ArrayList<>();
	
	public Employee() { }
	
	public Integer getEmployeeId() { return employeeId; }
	public EmployeeStatus getEmployeeStatus() { return employeeStatus; }
	public EmployeeRole getEmployeeRole() { return employeeRole; }
	
	public void setEmployeeStatus(EmployeeStatus employeeStatus) { this.employeeStatus = employeeStatus; }
	public void setEmployeeRole(EmployeeRole employeeRole) { this.employeeRole = employeeRole; }

}
