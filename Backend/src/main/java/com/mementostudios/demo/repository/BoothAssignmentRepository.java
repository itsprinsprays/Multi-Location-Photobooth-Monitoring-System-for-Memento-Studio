package com.mementostudios.demo.repository;

import java.time.LocalDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.mementostudios.demo.entity.BoothAssignment;
import com.mementostudios.demo.entity.Booth.Booth;
import com.mementostudios.demo.entity.Employee.Employee;

@Repository
public interface BoothAssignmentRepository extends JpaRepository<BoothAssignment, Integer> {
    
    // 1. Checks if the BOOTH already has an employee on that day
    boolean existsByBoothAndAssignmentDate(Booth booth, LocalDate assignmentDate);

    // 2. Checks if the EMPLOYEE is already booked at another booth on that day
    boolean existsByEmployeeAndAssignmentDate(Employee employee, LocalDate assignmentDate);
}