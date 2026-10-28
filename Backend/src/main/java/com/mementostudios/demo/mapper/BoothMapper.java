package com.mementostudios.demo.mapper;

import org.springframework.stereotype.Component;

import com.mementostudios.demo.dto.booth.BoothResponseDTO;
import com.mementostudios.demo.entity.Booth.Booth;

@Component
public class BoothMapper {

	public BoothResponseDTO toResponse(Booth booth) {
		
	     if (booth == null) {
	            return null;
	        }
		
		BoothResponseDTO dto = new BoothResponseDTO(
				booth.getBoothId(),
				booth.getBoothName(),
				booth.getBoothLocation(),
				booth.getBoothType(),
				booth.getBoothStatus(),
				booth.getCreationDate()
				);
		
		return dto;
		
		
	}
	
	
}
