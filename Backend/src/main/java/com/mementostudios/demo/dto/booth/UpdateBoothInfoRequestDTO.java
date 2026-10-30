package com.mementostudios.demo.dto.booth;

import com.mementostudios.demo.entity.Booth.BoothType;

import jakarta.validation.constraints.Size;

public class UpdateBoothInfoRequestDTO {
	
	
	
	@Size(min = 5, max = 30, message = "Name must be between 5 and 30 characters")
	private String boothName;
	private String boothLocation;
	private BoothType boothType;
	
	
	public UpdateBoothInfoRequestDTO() {}
	
	public String getBoothName() { return boothName; }
	public String getBoothLocation() { return boothLocation; }
	public BoothType getBoothType() { return boothType; }
	
	public void setBoothName(String boothName) { this.boothName = boothName; }
	public void setBoothLocation(String boothLocation) { this.boothLocation = boothLocation; }
	public void setBoothType(BoothType boothType) { this.boothType = boothType; }

}
