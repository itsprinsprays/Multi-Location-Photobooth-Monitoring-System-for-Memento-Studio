package com.mementostudios.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mementostudios.demo.dto.boothAssignment.BoothAssignmentResponseDTO;
import com.mementostudios.demo.dto.boothAssignment.CreateBoothAssignmentRequestDTO;
import com.mementostudios.demo.service.BoothAssignmentService;

@RequestMapping("/api/boothAssignment")
@RestController
@Validated
@CrossOrigin(origins = "*")
public class BoothAssignmentController {
	
	private final BoothAssignmentService boothAssignmentService;
	
	public BoothAssignmentController(BoothAssignmentService boothAssignmentService) {
		this.boothAssignmentService = boothAssignmentService;
	}
	
	@PostMapping("/assignBooth/{boothId}")
	public ResponseEntity<BoothAssignmentResponseDTO> boothAssignment(@RequestBody CreateBoothAssignmentRequestDTO dto, @PathVariable String boothId) {
		return ResponseEntity.status(HttpStatus.CREATED).body(boothAssignmentService.assignBooth(dto, boothId));
	}

}
