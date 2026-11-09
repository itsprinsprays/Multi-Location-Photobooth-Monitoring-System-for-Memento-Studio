package com.mementostudios.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mementostudios.demo.dto.employee.CreateEmployeeRequestDTO;
import com.mementostudios.demo.dto.employee.EmployeeResponseDTO;
import com.mementostudios.demo.service.EmployeeService;


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
	
	
	
}
