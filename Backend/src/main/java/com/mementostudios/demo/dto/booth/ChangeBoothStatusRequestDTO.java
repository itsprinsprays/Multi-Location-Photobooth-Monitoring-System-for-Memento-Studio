package com.mementostudios.demo.dto.booth;


import com.mementostudios.demo.entity.Booth.BoothStatus;

import jakarta.validation.constraints.NotNull;

public record ChangeBoothStatusRequestDTO(
    @NotNull(message = "Booth status is required")
    BoothStatus boothStatus,
    
    Long changedBy // Optional now, but ready for BoothStatusHistory!
) {}