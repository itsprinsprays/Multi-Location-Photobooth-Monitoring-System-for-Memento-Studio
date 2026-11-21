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
        Booth booth = boothRepository.findByBoothIdAndIsActiveTrue(boothId)
                .orElseThrow(() -> new ResourceNotFoundException("Booth with ID " + boothId + " not found"));
        
        Employee employee = employeeRepository.findByEmployeeIdAndIsActiveTrue(dto.getEmployeeId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee with ID " + dto.getEmployeeId() + " not found"));
        
        // Rule 1: Booth is already occupied for this date
        if (boothAssignmentRepository.existsByBoothAndAssignmentDate(booth, dto.getAssignmentDate())) {
            throw new DuplicateResponseException("This booth is already assigned to someone for " + dto.getAssignmentDate());
        }

        // Rule 2: Employee is already scheduled at another booth on this date!
        if (boothAssignmentRepository.existsByEmployeeAndAssignmentDate(employee, dto.getAssignmentDate())) {
            throw new DuplicateResponseException(employee.getEmployeeName() + " is already assigned to a booth on " + dto.getAssignmentDate());
        }
        
        BoothAssignment assignment = new BoothAssignment();
        assignment.setBooth(booth);
        assignment.setEmployee(employee);
        assignment.setAssignmentDate(dto.getAssignmentDate()); 
        
        boothAssignmentRepository.save(assignment);
        
        return boothAssignmentMapper.toResponse(assignment);
    }
}