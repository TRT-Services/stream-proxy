package com.streamingproxy.backend.controller;

import com.streamingproxy.backend.dto.SearchResponseDto;
import com.streamingproxy.backend.service.VideoSearchService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotBlank;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@Validated
@Tag(name = "Video Search", description = "Searches public videos via the official YouTube Data API (metadata only).")
public class VideoSearchController {

    private final VideoSearchService videoSearchService;

    public VideoSearchController(VideoSearchService videoSearchService) {
        this.videoSearchService = videoSearchService;
    }

    @Operation(summary = "Search videos", description = "Returns a list of video results (title, thumbnail, channel) for the given query.")
    @GetMapping("/api/videos/search")
    public SearchResponseDto search(
            @RequestParam @NotBlank String q,
            @RequestParam(required = false) Integer maxResults) {
        log.info("Received search request q={} maxResults={}", q, maxResults);
        return videoSearchService.search(q, maxResults);
    }
}
