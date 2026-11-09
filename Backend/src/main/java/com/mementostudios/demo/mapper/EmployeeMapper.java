package com.mementostudios.demo.mapper;

import org.springframework.stereotype.Component;

import com.mementostudios.demo.dto.employee.CreateEmployeeRequestDTO;
import com.mementostudios.demo.dto.employee.EmployeeResponseDTO;
import com.mementostudios.demo.entity.Employee.Employee;

@Component
public class EmployeeMapper {
	
	public Employee toEntity(CreateEmployeeRequestDTO dto) {
		if (dto == null) {
			return null;
		}
		
		Employee employee = new Employee();
		employee.setEmployeeName(dto.getEmployeeName());
		employee.setUsername(dto.getUsername());
		employee.setEmail(dto.getEmail());
		employee.setContactNumber(dto.getContactNumber());
		employee.setEmployeeRole(dto.getEmployeeRole());
		
		return employee;
	}
	
	public EmployeeResponseDTO toResponse(Employee employee) {
		if(employee == null) {
			return null;
		}
		
		return new EmployeeResponseDTO(
				employee.getEmployeeId(),
				employee.getEmployeeName(),
				employee.getUsername(),
				employee.getEmail(),
				employee.getContactNumber(),
				employee.isActive(),
				employee.getEmployeeRole(),
				employee.getCreationDate()
				);
	}
	
	

}
