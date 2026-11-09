package com.mementostudios.demo.service;

import org.springframework.stereotype.Service;

import com.mementostudios.demo.dto.employee.CreateEmployeeRequestDTO;
import com.mementostudios.demo.dto.employee.EmployeeResponseDTO;
import com.mementostudios.demo.entity.Employee.Employee;
import com.mementostudios.demo.exception.DuplicateResponseException;
import com.mementostudios.demo.exception.ResourceNotFoundException;
import com.mementostudios.demo.mapper.EmployeeMapper;
import com.mementostudios.demo.repository.EmployeeRepository;

import jakarta.transaction.Transactional;

@Service
public class EmployeeService {
	
	private final EmployeeRepository employeeRepository;
	private final EmployeeMapper employeeMapper;
	
	public EmployeeService(EmployeeRepository employeeRepository, EmployeeMapper employeeMapper) {
		this.employeeRepository = employeeRepository;
		this.employeeMapper = employeeMapper;
	}
	
	@Transactional
	public EmployeeResponseDTO createEmployee(CreateEmployeeRequestDTO dto) {
		
		if(employeeRepository.existsByUsername(dto.getUsername()))
			throw new DuplicateResponseException("Username " + dto.getUsername() + " is already existing");
		
		Employee employee = employeeMapper.toEntity(dto);
		
		employeeRepository.save(employee);
		
		return employeeMapper.toResponse(employee);
	}
	
	@Transactional
	public EmployeeResponseDTO getEmployeeById(Integer employeeId) {
		
		Employee employee = employeeRepository.findById(employeeId)
				.orElseThrow(() -> new ResourceNotFoundException("Employee Id" + employeeId + " is not existing"));
		
		return employeeMapper.toResponse(employee);
		
	}
	
	
	
	

}
