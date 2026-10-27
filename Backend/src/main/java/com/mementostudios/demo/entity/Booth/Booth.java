package com.mementostudios.demo.entity.Booth;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Booth")
public class Booth {
	
	@Id
	private int booth_id;
	
	@Column(nullable = false)
	private String booth_name;
	
	@Column(nullable = false)
	private String booth_location;
	
	@CreationTimestamp
	private LocalDate creation_date;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private BoothType booth_type;
	
	
}
