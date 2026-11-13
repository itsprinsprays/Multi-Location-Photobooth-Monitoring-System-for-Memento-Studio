package com.mementostudios.demo.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.mementostudios.demo.entity.Employee.*;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer>{

	boolean existsByUsername(String username);
	boolean existsByContactNumber(String number);
	boolean existsByEmail(String email);
	long countByIsActiveTrue();
	long countByWorkStatusAndIsActiveTrue(WorkStatus workStatus);
	
	@Query("""
		    SELECT e FROM Employee e
		    WHERE e.isActive = true
		      AND (:role IS NULL OR e.employeeRole = :role)
		      AND (:workStatus IS NULL OR e.workStatus = :workStatus)
		      AND (:keyword IS NULL OR :keyword = '' OR
		           LOWER(e.employeeName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR
		           LOWER(e.username) LIKE LOWER(CONCAT('%', :keyword, '%')) OR
		           LOWER(e.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR
		           LOWER(e.contactNumber) LIKE LOWER(CONCAT('%', :keyword, '%')))
		""")
		Page<Employee> searchEmployees(
		    @Param("keyword") String keyword,
		    @Param("role") EmployeeRole role,
		    @Param("workStatus") WorkStatus status,
		    Pageable pageable
		);
}
