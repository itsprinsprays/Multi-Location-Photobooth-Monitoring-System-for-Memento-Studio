package com.mementostudios.demo.entity.Booth;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.mementostudios.demo.entity.BoothAssignment;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Booth")
public class Booth {
	
	@Id
	@Column(name = "booth_id")
	private String boothId;
	
	@Column(name = "booth_name", nullable = false, length = 100)
	private String boothName;
	
	@Column(name = "booth_location",nullable = false, length = 100)
	private String boothLocation;
	
	@CreationTimestamp
	@Column(name = "creation_date", updatable = false)
	private LocalDate creationDate;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "booth_type", nullable = false)
	private BoothType boothType;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "booth_status", nullable = false)
	private BoothStatus boothStatus;
	
	@OneToMany(mappedBy = "booth", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<BoothAssignment> assignments = new ArrayList<>();
	
//	@OneToMany(mappedBy = "booth", cascade = CascadeType.ALL, orphanRemoval = true)
//	private List<BoothStatusHistory> statusHistory = new ArrayList<>();
	
	public Booth() { }
	
	public String getBoothId() { return boothId; }
	public String getBoothName() { return boothName; }
	public String getBoothLocation() { return boothLocation; }
	public LocalDate getCreationDate() { return creationDate; }
	public BoothType getBoothType() { return boothType; }
	public BoothStatus getBoothStatus() { return boothStatus; }
	
	public void setBoothId(String boothId) { this.boothId = boothId; }
	public void setBoothName(String boothName) { this.boothName = boothName; }
	public void setBoothLocation(String boothLocation) { this.boothLocation = boothLocation; }
	public void setBoothType(BoothType boothType) { this.boothType = boothType; }
	public void setBoothStatus(BoothStatus boothStatus) { this.boothStatus = boothStatus; }
	
	
	
	
}
