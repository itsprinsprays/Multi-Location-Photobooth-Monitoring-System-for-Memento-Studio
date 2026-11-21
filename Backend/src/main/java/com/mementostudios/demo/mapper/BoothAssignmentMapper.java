package com.mementostudios.demo.mapper;

import org.springframework.stereotype.Component;
import com.mementostudios.demo.dto.boothAssignment.BoothAssignmentResponseDTO;
import com.mementostudios.demo.entity.BoothAssignment;

@Component
public class BoothAssignmentMapper {
    
    public BoothAssignmentResponseDTO toResponse(BoothAssignment assignment) {
        if (assignment == null) {
            return null;
        }
        
        return new BoothAssignmentResponseDTO(
            assignment.getAssignmentId(),
            assignment.getBooth().getBoothId(),
            assignment.getBooth().getBoothName(),
            assignment.getEmployee().getEmployeeId(),
            assignment.getEmployee().getEmployeeName(),
            assignment.getCreationDate()
        );
    }
}