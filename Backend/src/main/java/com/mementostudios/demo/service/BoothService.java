package com.mementostudios.demo.service;

import org.springframework.stereotype.Service;

import com.mementostudios.demo.dto.booth.BoothResponseDTO;
import com.mementostudios.demo.dto.booth.CreateBoothRequestDTO;
import com.mementostudios.demo.entity.Booth.Booth;
import com.mementostudios.demo.exception.DuplicateResponseException;
import com.mementostudios.demo.mapper.BoothMapper;
import com.mementostudios.demo.repository.BoothRepository;

import jakarta.transaction.Transactional;

@Service
public class BoothService {
	
	private final BoothRepository boothRepository;
	private final BoothMapper boothMapper;
	
	public BoothService(BoothRepository boothRepository, BoothMapper boothMapper) {
		this.boothRepository = boothRepository;
		this.boothMapper = boothMapper;
	}
	
	@Transactional
	public BoothResponseDTO createBooth(CreateBoothRequestDTO dto) {
		
		if(boothRepository.existsByBoothName(dto.getBoothName()))
			throw new DuplicateResponseException(dto.getBoothName() + " is already existing");
		
		Booth booth = new Booth();
			booth.setBoothId(dto.getBoothId());
			booth.setBoothName(dto.getBoothName());
			booth.setBoothLocation(dto.getBoothLocation());
			booth.setBoothType(dto.getBoothType());
			
		boothRepository.save(booth);
		
		return boothMapper.toResponse(booth);
				
		
	}

}
