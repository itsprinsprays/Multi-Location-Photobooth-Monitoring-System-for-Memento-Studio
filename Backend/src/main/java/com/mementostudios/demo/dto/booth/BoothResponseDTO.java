package com.mementostudios.demo.dto.booth;

import java.time.LocalDate;
import com.mementostudios.demo.entity.Booth.BoothStatus;
import com.mementostudios.demo.entity.Booth.BoothType;

public class BoothResponseDTO {

    private String boothId;
    private String boothName;
    private String boothLocation;
    private BoothType boothType;
    private BoothStatus boothStatus;
    private LocalDate creationDate;
    private boolean isActive;

    public BoothResponseDTO() {}

    public BoothResponseDTO(String boothId, String boothName, String boothLocation, 
                            BoothType boothType, BoothStatus boothStatus, LocalDate creationDate, boolean isActive) {
        this.boothId = boothId;
        this.boothName = boothName;
        this.boothLocation = boothLocation;
        this.boothType = boothType;
        this.boothStatus = boothStatus;
        this.creationDate = creationDate;
        this.isActive = isActive;
    }
    
    // Getters and Setters
    public String getBoothId() { return boothId; }
    public void setBoothId(String boothId) { this.boothId = boothId; }

    public String getBoothName() { return boothName; }
    public void setBoothName(String boothName) { this.boothName = boothName; }

    public String getBoothLocation() { return boothLocation; }
    public void setBoothLocation(String boothLocation) { this.boothLocation = boothLocation; }

    public BoothType getBoothType() { return boothType; }
    public void setBoothType(BoothType boothType) { this.boothType = boothType; }

    public BoothStatus getBoothStatus() { return boothStatus; }
    public void setBoothStatus(BoothStatus boothStatus) { this.boothStatus = boothStatus; }

    public LocalDate getCreationDate() { return creationDate; }
    public void setCreationDate(LocalDate creationDate) { this.creationDate = creationDate; }
    
	public boolean isActive() { return isActive; }
    public void setActive(boolean active) { this.isActive = active; }
}