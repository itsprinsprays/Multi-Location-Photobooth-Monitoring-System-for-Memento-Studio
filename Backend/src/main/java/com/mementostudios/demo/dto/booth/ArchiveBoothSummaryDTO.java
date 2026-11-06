package com.mementostudios.demo.dto.booth;

import java.time.LocalDateTime;

public record ArchiveBoothSummaryDTO(
	long totalArchived,
	long popUpArchived,
	long permanentArchived,
	LocalDateTime lastArchivedAt
) {}
