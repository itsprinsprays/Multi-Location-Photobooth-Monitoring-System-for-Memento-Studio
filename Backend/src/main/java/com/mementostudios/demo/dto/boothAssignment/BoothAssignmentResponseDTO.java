package com.mementostudios.demo.dto.boothAssignment;

import java.time.LocalDate;

public class BoothAssignmentResponseDTO {
    
    private Integer assignmentId;
    private String boothId;
    private String boothName;
    private Integer employeeId;
    private String employeeName;
    private LocalDate creationDate;
    
    public BoothAssignmentResponseDTO(Integer assignmentId, String boothId, String boothName, 
                                      Integer employeeId, String employeeName, LocalDate creationDate) {
        this.assignmentId = assignmentId;
        this.boothId = boothId;
        this.boothName = boothName;
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.creationDate = creationDate;
    }
    
    // Getters
    public Integer getAssignmentId() { return assignmentId; }
    public String getBoothId() { return boothId; }
    public String getBoothName() { return boothName; }
    public Integer getEmployeeId() { return employeeId; }
    public String getEmployeeName() { return employeeName; }
    public LocalDate getCreationDate() { return creationDate; }
}