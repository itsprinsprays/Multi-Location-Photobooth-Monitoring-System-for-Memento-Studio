package com.mementostudios.demo.dto.booth;

public record ArchiveBoothSummaryDTO(
	long totalArchived,
	long popUpArchived,
	long permanentArchived
) {}
