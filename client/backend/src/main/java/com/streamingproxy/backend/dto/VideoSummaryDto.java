package com.streamingproxy.backend.dto;

/** Lightweight video metadata returned by the YouTube Data API v3 search. */
public record VideoSummaryDto(
        String videoId,
        String title,
        String description,
        String channelTitle,
        String publishedAt,
        String thumbnailUrl
) {
}
