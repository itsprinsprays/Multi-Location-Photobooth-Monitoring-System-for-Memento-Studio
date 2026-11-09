package com.mementostudios.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.mementostudios.demo.entity.Employee.*;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer>{

	boolean existsByUsername(String username);
}
