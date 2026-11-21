package com.mementostudios.demo.dto.boothAssignment;

import java.time.LocalDate;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;

public class CreateBoothAssignmentRequestDTO {
    
    @NotNull(message = "Employee ID is required")
    private Integer employeeId;
    
    @NotNull(message = "Assignment date is required")
    @FutureOrPresent(message = "Assignment date cannot be in the past")
    private LocalDate assignmentDate;

    public CreateBoothAssignmentRequestDTO() {}

    public CreateBoothAssignmentRequestDTO(Integer employeeId, LocalDate assignmentDate) {
        this.employeeId = employeeId;
        this.assignmentDate = assignmentDate;
    }

    public Integer getEmployeeId() { return employeeId; }
    public void setEmployeeId(Integer employeeId) { this.employeeId = employeeId; }

    public LocalDate getAssignmentDate() { return assignmentDate; }
    public void setAssignmentDate(LocalDate assignmentDate) { this.assignmentDate = assignmentDate; }
}