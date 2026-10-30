package com.mementostudios.demo.controller;

import org.springframework.data.domain.PageRequest;
import com.mementostudios.demo.dto.booth.ChangeBoothStatusRequestDTO;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import com.mementostudios.demo.dto.PageResponseDTO;
import com.mementostudios.demo.dto.booth.BoothResponseDTO;
import com.mementostudios.demo.dto.booth.CreateBoothRequestDTO;
import com.mementostudios.demo.dto.booth.UpdateBoothInfoRequestDTO;
import com.mementostudios.demo.service.BoothService;
import org.springframework.data.domain.Pageable;

import jakarta.validation.Valid;

@RequestMapping("/api/booth")
@RestController
@Validated
public class BoothController {
	
	private final BoothService boothService;
	
	public BoothController(BoothService boothService) {
		this.boothService = boothService;
	}
	
	@PostMapping("/create")
	public ResponseEntity<BoothResponseDTO> createBooth(@Valid @RequestBody CreateBoothRequestDTO dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(boothService.createBooth(dto));
	}
	
	@GetMapping("/allBooth")
	public ResponseEntity<PageResponseDTO<BoothResponseDTO>> getAllBooth(@RequestParam(defaultValue = "0") int page, 
																		@RequestParam(defaultValue = "5") int size) {
		Pageable pageable = PageRequest.of(page, size, Sort.by("boothId").ascending());
		return ResponseEntity.ok().body(boothService.getAllBooth(pageable));
	}
	

	@PatchMapping("/status/{boothId}")
	public ResponseEntity<BoothResponseDTO> changeStatus(@Valid @RequestBody ChangeBoothStatusRequestDTO dto, @PathVariable String boothId) {
		return ResponseEntity.ok(boothService.changeStatus(dto, boothId));
	}
	
	@PatchMapping("/updateInfo/{boothId}")
	public ResponseEntity<BoothResponseDTO> boothInfoUpdate(@Valid @RequestBody UpdateBoothInfoRequestDTO dto, @PathVariable String boothId) {
		return ResponseEntity.ok(boothService.boothInfoUpdate(dto, boothId));
	}
}
