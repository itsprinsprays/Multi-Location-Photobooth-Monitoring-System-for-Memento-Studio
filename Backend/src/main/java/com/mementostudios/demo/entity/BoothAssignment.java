package com.mementostudios.demo.entity;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;

import com.mementostudios.demo.entity.Booth.Booth;
import com.mementostudios.demo.entity.Employee.Employee;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "BoothAssignment")
public class BoothAssignment {
	  
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "assignment_id")
	private Integer assignmentId;
	
	@CreationTimestamp
	@Column(name = "creation_date")
	private LocalDate creationDate;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "booth_id", nullable = false)
	private Booth booth;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false) 
	@JoinColumn(name = "employee_id", nullable = false)
	private Employee employee;
	
	public BoothAssignment() {}
	
	public Integer getAssignmentId() { return assignmentId; }
	public LocalDate getCreationDate() { return creationDate; }
	public Booth getBooth() { return booth; }
	public Employee getEmployee() { return employee; }
	
	public void setBooth(Booth booth) { this.booth = booth; }
	public void setEmployee(Employee employee) { this.employee = employee; }
	

}
