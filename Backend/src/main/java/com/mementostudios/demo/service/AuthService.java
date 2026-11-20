package com.mementostudios.demo.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.mementostudios.demo.dto.login.LoginRequestDTO;
import com.mementostudios.demo.dto.login.LoginResponseDTO;
import com.mementostudios.demo.entity.Employee.Employee;
import com.mementostudios.demo.exception.ResourceNotFoundException;
import com.mementostudios.demo.repository.EmployeeRepository;
import com.mementostudios.demo.security.JwtUtil;

@Service
public class AuthService {
	
	private final AuthenticationManager authenticationManager;
	private final JwtUtil jwtUtil;
	private final EmployeeRepository employeeRepository;
	
	public AuthService(AuthenticationManager authenticationManager, JwtUtil jwtUtil, EmployeeRepository employeeRepository) {
		this.authenticationManager = authenticationManager;
		this.jwtUtil = jwtUtil;
		this.employeeRepository = employeeRepository;
	}
	
	public LoginResponseDTO login(LoginRequestDTO dto) {
		
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword()));
		
		Employee employee = employeeRepository.findByUsername(dto.getUsername())
				.orElseThrow(() -> new ResourceNotFoundException("User not Found: " + dto.getUsername()));
		
		String accessToken = jwtUtil.generateToken(employee.getUsername(), employee.getPassword(), employee.getEmployeeId());
		
		String refreshToken = jwtUtil.refreshGenerateToken(employee.getUsername());
		
		return new LoginResponseDTO(accessToken, refreshToken, employee.getEmployeeId(), 
				employee.getEmployeeName(), employee.getUsername(), employee.getEmployeeRole());
		
	}
	

}
