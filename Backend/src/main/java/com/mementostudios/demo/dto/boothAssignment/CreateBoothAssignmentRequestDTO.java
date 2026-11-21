package com.mementostudios.demo.dto.boothAssignment;

import jakarta.validation.constraints.NotNull;

public class CreateBoothAssignmentRequestDTO {
    
    @NotNull(message = "Employee ID is required")
    private Integer employeeId;
    
    public CreateBoothAssignmentRequestDTO() { }
    
    public CreateBoothAssignmentRequestDTO(Integer employeeId) {
        this.employeeId = employeeId;
    }
    
    public Integer getEmployeeId() { return employeeId; }
    public void setEmployeeId(Integer employeeId) { this.employeeId = employeeId; }
}