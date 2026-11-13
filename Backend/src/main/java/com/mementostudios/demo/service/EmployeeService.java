package com.mementostudios.demo.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.mementostudios.demo.dto.PageResponseDTO;
import com.mementostudios.demo.dto.employee.CreateEmployeeRequestDTO;
import com.mementostudios.demo.dto.employee.EmployeeResponseDTO;
import com.mementostudios.demo.dto.employee.EmployeeSummaryDTO;
import com.mementostudios.demo.dto.employee.UpdateEmployeeInfoRequestDTO;
import com.mementostudios.demo.entity.Employee.Employee;
import com.mementostudios.demo.entity.Employee.EmployeeRole;
import com.mementostudios.demo.entity.Employee.WorkStatus;
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
			throw new DuplicateResponseException("Username " + dto.getUsername() + " is existing");
		
		if(employeeRepository.existsByContactNumber(dto.getContactNumber()))
			throw new DuplicateResponseException("Contact Number " + dto.getContactNumber() + " is existing");
		
		if(employeeRepository.existsByEmail(dto.getEmail()))
			throw new DuplicateResponseException("Work Email " + dto.getEmail() + " is existing");
		
		Employee employee = employeeMapper.toEntity(dto);
		
		employeeRepository.save(employee);
		
		return employeeMapper.toResponse(employee);
	}
	
	@Transactional
	public PageResponseDTO<EmployeeResponseDTO> getAllEmployee(Pageable pageable, EmployeeRole employeeRole, WorkStatus workStatus, String search) {
		String query = (search != null && !search.trim().isEmpty()) ? search.trim() : null;
		
		Page<Employee> page = employeeRepository.searchEmployees(query, employeeRole, workStatus, pageable);
		
		return employeeMapper.toPageResponse(page);	
	}
	
	@Transactional
	public EmployeeResponseDTO getEmployeeById(Integer employeeId) {
		
		Employee employee = employeeRepository.findById(employeeId)
				.orElseThrow(() -> new ResourceNotFoundException("Employee with ID " + employeeId + " is not existing"));
		
		return employeeMapper.toResponse(employee);
		
	}
	
	@Transactional
	public EmployeeResponseDTO updateEmployeeInfo(UpdateEmployeeInfoRequestDTO dto, Integer employeeId) {
		
		Employee employee = employeeRepository.findById(employeeId)
				.orElseThrow(() -> new ResourceNotFoundException("Employee with ID " + employeeId + " is not existing"));
		
		if(dto.getEmployeeName() != null) {
			employee.setEmployeeName(dto.getEmployeeName());
		}
		
		if(dto.getEmail() != null) {
			if(employeeRepository.existsByEmail(dto.getEmail())) 
				throw new DuplicateResponseException("Work Email " + dto.getEmail() + " is existing");
			employee.setEmail(dto.getEmail());
		}
		
		if(dto.getContactNumber() != null) {
			if(employeeRepository.existsByContactNumber(dto.getContactNumber()))
				throw new DuplicateResponseException("Contact Number " + dto.getContactNumber() + " is existing");
			employee.setContactNumber(dto.getContactNumber());
		}
		
		if(dto.getEmployeeRole() != null) {
			employee.setEmployeeRole(dto.getEmployeeRole());
		}
		
		employeeRepository.save(employee);
		
		return employeeMapper.toResponse(employee);
		
	}
	
	@Transactional
	public void deleteEmployee(Integer employeeId) {
		Employee employee = employeeRepository.findById(employeeId)
				.orElseThrow(() -> new ResourceNotFoundException(""));
		
		if(!employee.isActive()) {
			throw new ResourceNotFoundException("");
		}
		
		employee.setActive(false);
		employee.setWorkStatus(WorkStatus.OFF_DUTY);
		employeeRepository.save(employee);
	}
	
	public EmployeeSummaryDTO employeeSummary() {
		long total = employeeRepository.countByIsActiveTrue();
		long online = employeeRepository.countByWorkStatusAndIsActiveTrue(WorkStatus.ON_DUTY);
		long offline = employeeRepository.countByWorkStatusAndIsActiveTrue(WorkStatus.OFF_DUTY);
		
		return new EmployeeSummaryDTO(total, online, offline);
	}
	

	
	
	
	

}
