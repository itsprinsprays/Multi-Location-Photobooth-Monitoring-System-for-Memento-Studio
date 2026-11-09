package com.mementostudios.demo.controller;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mementostudios.demo.dto.PageResponseDTO;
import com.mementostudios.demo.dto.employee.CreateEmployeeRequestDTO;
import com.mementostudios.demo.dto.employee.EmployeeResponseDTO;
import com.mementostudios.demo.entity.Employee.EmployeeRole;
import com.mementostudios.demo.service.EmployeeService;
import org.springframework.data.domain.Pageable;

import jakarta.validation.Valid;

@RequestMapping("/api/employee")
@RestController
@Validated
@CrossOrigin(origins = "*")
public class EmployeeController {

	private final EmployeeService employeeService;
	
	public EmployeeController(EmployeeService employeeService) {
		this.employeeService = employeeService;
	}
	
	@PostMapping("/create")
	public ResponseEntity<EmployeeResponseDTO> createEmployee(@Valid @RequestBody CreateEmployeeRequestDTO dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(employeeService.createEmployee(dto));
	}
	
	@GetMapping("/{employeeId}")
	public ResponseEntity<EmployeeResponseDTO> getSpecificEmployee(@PathVariable Integer employeeId) {
		return ResponseEntity.ok().body(employeeService.getEmployeeById(employeeId));
	}
	
	@GetMapping("/allEmployee")
	public ResponseEntity<PageResponseDTO<EmployeeResponseDTO>> getAllEmployee(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "5") int size,
			@RequestParam(required = false) EmployeeRole employeeRole,
			@RequestParam(required = false) String search
		) {
		
		Pageable pageable = PageRequest.of(page, size, Sort.by("employeeId").ascending());
		
		return ResponseEntity.ok().body(employeeService.getAllEmployee(pageable, employeeRole, search));
	}
	
	
	
}
