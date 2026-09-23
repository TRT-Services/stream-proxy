package com.streamingproxy.backend.controller;

import com.streamingproxy.backend.service.VideoStreamService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotBlank;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@Validated
@Tag(name = "Video Streaming", description = "Streams remote video content without ever exposing the source URL to the browser.")
public class VideoStreamController {

    private final VideoStreamService videoStreamService;

    public VideoStreamController(VideoStreamService videoStreamService) {
        this.videoStreamService = videoStreamService;
    }

    @Operation(summary = "Stream a video", description = "Proxies a remote video through the Node.js streaming proxy, forwarding Range headers for seek support.")
    @GetMapping("/api/videos/stream")
    public ResponseEntity<InputStreamResource> streamVideo(
            @Parameter(description = "Source video URL to stream") @RequestParam @NotBlank String url,
            @RequestHeader(value = HttpHeaders.RANGE, required = false) String range) {
        log.info("Received stream request url={} range={}", url, range);
        return videoStreamService.streamVideo(url, range);
    }
}
