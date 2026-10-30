package com.mementostudios.demo.service;


import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.mementostudios.demo.dto.PageResponseDTO;
import com.mementostudios.demo.dto.booth.BoothResponseDTO;
import com.mementostudios.demo.dto.booth.ChangeBoothStatusRequestDTO;
import com.mementostudios.demo.dto.booth.CreateBoothRequestDTO;
import com.mementostudios.demo.dto.booth.UpdateBoothInfoRequestDTO;
import com.mementostudios.demo.entity.Booth.Booth;
import com.mementostudios.demo.entity.Booth.BoothStatus;
import com.mementostudios.demo.exception.DuplicateResponseException;
import com.mementostudios.demo.exception.ResourceNotFoundException;
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
	
	//Create Booth
	@Transactional
	public BoothResponseDTO createBooth(CreateBoothRequestDTO dto) {
		
	    if (boothRepository.existsById(dto.getBoothId())) {
	        throw new DuplicateResponseException("Booth ID '" + dto.getBoothId() + "' already exists");
	    }
		
		if(boothRepository.existsByBoothName(dto.getBoothName()))
			throw new DuplicateResponseException(dto.getBoothName() + " is already existing");
		
		if(boothRepository.existsByBoothLocation(dto.getBoothLocation()))
			throw new DuplicateResponseException(dto.getBoothLocation() + " is already existing. Same location is not allowed");
		
		Booth booth = boothMapper.toEntity(dto);
			
		boothRepository.save(booth);
		
		return boothMapper.toResponse(booth);	
	}
	
	//GetAllBooth
	@Transactional
	public PageResponseDTO<BoothResponseDTO> getAllBooth(Pageable pageable) {
		Page<Booth> page = boothRepository.findByIsActiveTrue(pageable);
		return boothMapper.toPageResponse(page);
	}
	
	//Get Specific Booth
	@Transactional
	public BoothResponseDTO getBoothById(String boothId) {
		
		Booth booth = boothRepository.findByBoothIdAndIsActiveTrue(boothId)
				.orElseThrow(() -> new ResourceNotFoundException("Booth With ID " + boothId + " is not existing"));
		
		return boothMapper.toResponse(booth);
	}
	
	//Update Booth Status
	@Transactional
	public BoothResponseDTO changeStatus(ChangeBoothStatusRequestDTO dto, String boothId) {
		
		Booth booth = boothRepository.findByBoothIdAndIsActiveTrue(boothId)
				.orElseThrow(() -> new ResourceNotFoundException("Booth With ID " + boothId + " is not existing"));
		
		booth.setBoothStatus(dto.boothStatus());
		boothRepository.save(booth);
		
		return boothMapper.toResponse(booth);
	}
	
	//Update Booth Informatio
	@Transactional
	public BoothResponseDTO boothInfoUpdate(UpdateBoothInfoRequestDTO dto, String boothId) {
		
		Booth booth = boothRepository.findByBoothIdAndIsActiveTrue(boothId)
				.orElseThrow(() -> new ResourceNotFoundException("Booth With ID " + boothId + " is not existing"));
		
		if (dto.getBoothName() != null && !dto.getBoothName().equals(booth.getBoothName())) {
		    if (boothRepository.existsByBoothName(dto.getBoothName())) {
		        throw new DuplicateResponseException(dto.getBoothName() + " is already in use by another booth");
		    }
		    booth.setBoothName(dto.getBoothName());
		}

		if (dto.getBoothLocation() != null && !dto.getBoothLocation().equals(booth.getBoothLocation())) {
		    if (boothRepository.existsByBoothLocation(dto.getBoothLocation())) {
		        throw new DuplicateResponseException(dto.getBoothLocation() + " is already in use by another booth");
		    }
		    booth.setBoothLocation(dto.getBoothLocation());
		}
		
		if(dto.getBoothType() != null) {
			booth.setBoothType(dto.getBoothType());
		}
		
		boothRepository.save(booth);
		
		return boothMapper.toResponse(booth);
		
	}
	
	@Transactional
	public void deleteBooth(String boothId) {
	    Booth booth = boothRepository.findById(boothId)
	        .orElseThrow(() -> new ResourceNotFoundException("Booth with ID " + boothId + " does not exist"));
	    if (!booth.isActive()) {
	        throw new ResourceNotFoundException("Booth with ID " + boothId + " is already deleted");
	    }
	    booth.setActive(false);
	    booth.setBoothStatus(BoothStatus.OFFLINE);
	    boothRepository.save(booth);
	}
	
	@Transactional
	public BoothResponseDTO restoreBooth(String boothId) {
		
		Booth booth = boothRepository.findById(boothId)
				.orElseThrow(() -> new ResourceNotFoundException("Booth with ID " + boothId + " does not exist"));
		
		if(booth.isActive()) {
			throw new ResourceNotFoundException("Booth with ID " + boothId + " is currently active");
		}
		
		booth.setActive(true);
		booth.setBoothStatus(BoothStatus.OFFLINE);
		
		boothRepository.save(booth);
		
		return boothMapper.toResponse(booth);
		
	}
	
	
	

}
