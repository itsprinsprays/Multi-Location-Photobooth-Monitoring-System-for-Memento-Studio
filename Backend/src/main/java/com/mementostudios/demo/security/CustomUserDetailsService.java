package com.mementostudios.demo.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.mementostudios.demo.entity.Employee.Employee;
import com.mementostudios.demo.repository.EmployeeRepository;

public class CustomUserDetailsService implements UserDetailsService {
	
	private final EmployeeRepository employeeRepository;
	
	public CustomUserDetailsService(EmployeeRepository employeeRepository) {
		this.employeeRepository = employeeRepository;
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Employee employee = employeeRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User not Found: " + username));
		
		if(!employee.isActive()) {
			throw new UsernameNotFoundException("Employee is archived: " + username);
		}
		
		return org.springframework.security.core.userdetails.User
				.builder()
				.username(employee.getUsername())
				.password(employee.getPassword())
				.roles(employee.getEmployeeRole().name())
				.build();
		
	}

}
