package com.mementostudios.demo.dto.booth;

import com.mementostudios.demo.entity.Booth.BoothType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class CreateBoothRequestDTO {
	
	@NotBlank(message = "Booth ID is required")
	@Pattern(
	    regexp = "^BoothId - \\d{3}$", 
	    message = "Booth ID must follow the format 'BoothId - 001'"
	)
	private String boothId;
	
	@NotBlank(message = "Name is required")
	@Size(min = 5, max = 30, message = "Name must be between 5 and 30 characters")
	private String boothName;
	
	@NotBlank(message = "Location is required")
	private String boothLocation;
	
	@NotNull(message = "Booth Type is required")
	private BoothType boothType;

	public CreateBoothRequestDTO() {}

	
	public String getBoothId() { return boothId; }
	public void setBoothId(String boothId) { this.boothId = boothId; }

	public String getBoothName() { return boothName; }
	public void setBoothName(String boothName) { this.boothName = boothName; }

	public String getBoothLocation() { return boothLocation; }
	public void setBoothLocation(String boothLocation) { this.boothLocation = boothLocation; }

	public BoothType getBoothType() { return boothType; }
	public void setBoothType(BoothType boothType) { this.boothType = boothType; }
}