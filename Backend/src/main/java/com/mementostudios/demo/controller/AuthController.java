package com.mementostudios.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mementostudios.demo.dto.login.LoginRequestDTO;
import com.mementostudios.demo.dto.login.LoginResponseDTO;
import com.mementostudios.demo.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
	
	private final AuthService authService;
	
	public AuthController(AuthService authService) {
		this.authService = authService;
	}
	
	@PostMapping("/login")
	public ResponseEntity<LoginResponseDTO> accountLogin(@Valid @RequestBody LoginRequestDTO dto) {
		return ResponseEntity.ok().body(authService.login(dto));
	}

}
