package com.streamingproxy.backend.dto;

import java.util.List;

public record SearchResponseDto(List<VideoSummaryDto> results) {
}
