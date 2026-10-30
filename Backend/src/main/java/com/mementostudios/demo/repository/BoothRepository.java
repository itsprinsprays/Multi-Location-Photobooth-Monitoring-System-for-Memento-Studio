package com.mementostudios.demo.repository;

import com.mementostudios.demo.entity.Booth.*;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoothRepository extends JpaRepository<Booth, String> {
	
	boolean existsByBoothName(String boothName);
	boolean existsByBoothLocation(String boothLocation);
	Page<Booth> findByIsActiveTrue(Pageable pageable);
	Optional<Booth> findByBoothIdAndIsActiveTrue(String boothId);
	Page<Booth> findByIsActiveFalse(Pageable pageable);
	Page<Booth> findByBoothStatusAndIsActiveTrue(BoothStatus status, Pageable pageable);
	long countByIsActiveTrue();
	long countByBoothStatusAndIsActiveTrue(BoothStatus status);
}
