package com.mementostudios.demo.repository;

import com.mementostudios.demo.entity.Booth.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoothRepository extends JpaRepository<Booth, String> {
	
	boolean existsByBoothName(String boothName);
	boolean existsByBoothLocation(String boothLocation);

}
