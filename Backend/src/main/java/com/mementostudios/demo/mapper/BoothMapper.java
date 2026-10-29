package com.mementostudios.demo.mapper;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import com.mementostudios.demo.dto.PageResponseDTO;
import com.mementostudios.demo.dto.booth.BoothResponseDTO;
import com.mementostudios.demo.dto.booth.CreateBoothRequestDTO;
import com.mementostudios.demo.entity.Booth.Booth;
import com.mementostudios.demo.entity.Booth.BoothStatus;

@Component
public class BoothMapper {

	public Booth toEntity(CreateBoothRequestDTO dto) {
		if (dto == null) {
			return null;
		}

		Booth booth = new Booth();
		booth.setBoothId(dto.getBoothId());
		booth.setBoothName(dto.getBoothName());
		booth.setBoothLocation(dto.getBoothLocation());
		booth.setBoothType(dto.getBoothType());
		booth.setBoothStatus(BoothStatus.OFFLINE);
		booth.setCreationDate(LocalDate.now());

		return booth;
	}

	public BoothResponseDTO toResponse(Booth booth) {
		if (booth == null) {
			return null;
		}

		return new BoothResponseDTO(
				booth.getBoothId(),
				booth.getBoothName(),
				booth.getBoothLocation(),
				booth.getBoothType(),
				booth.getBoothStatus(),
				booth.getCreationDate()
		);
	}

	public List<BoothResponseDTO> toResponseList(List<Booth> booths) {
		if (booths == null) {
			return Collections.emptyList();
		}

		return booths.stream()
				.map(this::toResponse)
				.toList();
	}

	public PageResponseDTO<BoothResponseDTO> toPageResponse(Page<Booth> boothPage) {
		if (boothPage == null) {
			return null;
		}

		Page<BoothResponseDTO> dtoPage = boothPage.map(this::toResponse);
		return PageResponseDTO.from(dtoPage);
	}
}
