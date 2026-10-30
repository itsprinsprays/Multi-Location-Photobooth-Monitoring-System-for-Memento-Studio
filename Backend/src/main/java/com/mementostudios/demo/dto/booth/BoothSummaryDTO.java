package com.mementostudios.demo.dto.booth;

public record BoothSummaryDTO(
		long totalBooths,
		long onlineBooths,
		long maintenanceBooths,
		long offlineBooths
		
) {}
