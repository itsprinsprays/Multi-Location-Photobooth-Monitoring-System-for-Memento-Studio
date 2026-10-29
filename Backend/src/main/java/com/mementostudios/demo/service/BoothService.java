package com.mementostudios.demo.service;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.mementostudios.demo.dto.PageResponseDTO;
import com.mementostudios.demo.dto.booth.BoothResponseDTO;
import com.mementostudios.demo.dto.booth.CreateBoothRequestDTO;
import com.mementostudios.demo.entity.Booth.Booth;
import com.mementostudios.demo.entity.Booth.BoothStatus;
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
		
	    if (boothRepository.existsById(dto.getBoothId())) {
	        throw new DuplicateResponseException("Booth ID '" + dto.getBoothId() + "' already exists");
	    }
		
		if(boothRepository.existsByBoothName(dto.getBoothName()))
			throw new DuplicateResponseException(dto.getBoothName() + " is already existing");
		
		Booth booth = new Booth();
			booth.setBoothId(dto.getBoothId());
			booth.setBoothName(dto.getBoothName());
			booth.setBoothLocation(dto.getBoothLocation());
			booth.setBoothType(dto.getBoothType());
			booth.setBoothStatus(BoothStatus.OFFLINE);
			booth.setCreationDate(LocalDate.now());
			
		boothRepository.save(booth);
		
		return boothMapper.toResponse(booth);	
	}
	
	public PageResponseDTO<BoothResponseDTO> getAllBooth(Pageable pageable) {
		Page<Booth> page = boothRepository.findAll(pageable);
		return boothMapper.toPageResponse(page);
	}
	
	
	

}
