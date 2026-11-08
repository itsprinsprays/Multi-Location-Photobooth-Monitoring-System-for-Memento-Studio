package com.mementostudios.demo.repository;

import com.mementostudios.demo.entity.Booth.*;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BoothRepository extends JpaRepository<Booth, String> {
	
	boolean existsByBoothName(String boothName);
	boolean existsByBoothLocation(String boothLocation);
	Page<Booth> findByIsActiveTrue(Pageable pageable);
	Optional<Booth> findByBoothIdAndIsActiveTrue(String boothId);
	Page<Booth> findByIsActiveFalse(Pageable pageable);
	Page<Booth> findByBoothTypeAndIsActiveFalse(Pageable pageable, BoothType type);
	Page<Booth> findByBoothStatusAndBoothTypeAndIsActiveTrue(BoothStatus status, BoothType type, Pageable pageable);
	Page<Booth> findByBoothStatusAndIsActiveTrue(BoothStatus status, Pageable pageable);
	Page<Booth> findByBoothTypeAndIsActiveTrue(BoothType type, Pageable pageable);
	long countByIsActiveTrue();
	long countByIsActiveFalse();
	long countByBoothStatusAndIsActiveTrue(BoothStatus status);
	long countByBoothTypeAndIsActiveFalse(BoothType type);
	Optional<Booth> findTopByIsActiveFalseOrderByArchivedAtDesc();

	@Query("""
		    SELECT b FROM Booth b 
		    WHERE b.isActive = false 
		      AND (:type IS NULL OR b.boothType = :type)
		      AND (:keyword IS NULL OR :keyword = '' OR 
		           LOWER(b.boothId) LIKE LOWER(CONCAT('%', :keyword, '%')) OR 
		           LOWER(b.boothName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR 
		           LOWER(b.boothLocation) LIKE LOWER(CONCAT('%', :keyword, '%')))
		""")
		Page<Booth> searchArchivedBooths(
		    @Param("keyword") String keyword, 
		    @Param("type") BoothType type, 
		    Pageable pageable
		);
	
	@Query("""
			SELECT b FROM Booth b
			WHERE b.isActive = true
			AND (:status IS NULL OR b.boothStatus = :status)
			AND (:type IS NULL OR b.boothType = :type)
			AND (:keyword IS NULL OR :keyword = '' OR
				LOWER(b.boothId) LIKE LOWER(CONCAT('%', :keyword, '%')) OR
				LOWER(b.boothName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR
				LOWER(b.boothName) LIKE LOWER(CONCAT('%', :keyword, '%')))
			
			""")
		Page<Booth> searchBooths(
				@Param("keyword") String keyword,
				@Param("status") BoothStatus status,
				@Param("type") BoothType type,
				Pageable pageable
			);

	
}
