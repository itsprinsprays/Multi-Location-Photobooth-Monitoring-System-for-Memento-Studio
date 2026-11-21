package com.mementostudios.demo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.mementostudios.demo.entity.BoothAssignment;
import com.mementostudios.demo.entity.Booth.Booth;
import com.mementostudios.demo.entity.Employee.Employee;

@Repository
public interface BoothAssignmentRepository extends JpaRepository<BoothAssignment, Integer> {
    
    // Prevents assigning the same employee to the same booth twice
    boolean existsByBoothAndEmployee(Booth booth, Employee employee);
    

}