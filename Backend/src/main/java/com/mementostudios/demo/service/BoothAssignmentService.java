package com.mementostudios.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mementostudios.demo.dto.boothAssignment.BoothAssignmentResponseDTO;
import com.mementostudios.demo.dto.boothAssignment.CreateBoothAssignmentRequestDTO;
import com.mementostudios.demo.entity.BoothAssignment;
import com.mementostudios.demo.entity.Booth.Booth;
import com.mementostudios.demo.entity.Employee.Employee;
import com.mementostudios.demo.exception.DuplicateResponseException;
import com.mementostudios.demo.exception.ResourceNotFoundException;
import com.mementostudios.demo.mapper.BoothAssignmentMapper;
import com.mementostudios.demo.repository.BoothAssignmentRepository;
import com.mementostudios.demo.repository.BoothRepository;
import com.mementostudios.demo.repository.EmployeeRepository;

@Service
public class BoothAssignmentService {

    private final BoothAssignmentRepository boothAssignmentRepository;
    private final BoothRepository boothRepository;
    private final EmployeeRepository employeeRepository;
    private final BoothAssignmentMapper boothAssignmentMapper;
    
    public BoothAssignmentService(BoothAssignmentRepository boothAssignmentRepository,
                                  BoothRepository boothRepository,
                                  EmployeeRepository employeeRepository,
                                  BoothAssignmentMapper boothAssignmentMapper) {
        this.boothAssignmentRepository = boothAssignmentRepository;
        this.boothRepository = boothRepository;
        this.employeeRepository = employeeRepository;
        this.boothAssignmentMapper = boothAssignmentMapper;
    }
    
    @Transactional
    public BoothAssignmentResponseDTO assignBooth(CreateBoothAssignmentRequestDTO dto, String boothId) {
        // 1. Verify booth exists and is active
        Booth booth = boothRepository.findByBoothIdAndIsActiveTrue(boothId)
                .orElseThrow(() -> new ResourceNotFoundException("Booth with ID " + boothId + " not found"));
        
        // 2. Verify employee exists and is active
        Employee employee = employeeRepository.findByEmployeeIdAndIsActiveTrue(dto.getEmployeeId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee with ID " + dto.getEmployeeId() + " not found"));
        
        // 3. Prevent duplicate assignment
        if (boothAssignmentRepository.existsByBoothAndEmployee(booth, employee)) {
            throw new DuplicateResponseException("Employee " + employee.getEmployeeName() + " is already assigned to this booth");
        }
        
        // 4. Create and save new assignment
        BoothAssignment assignment = new BoothAssignment();
        assignment.setBooth(booth);
        assignment.setEmployee(employee);
        
        boothAssignmentRepository.save(assignment);
        
        return boothAssignmentMapper.toResponse(assignment);
    }
}