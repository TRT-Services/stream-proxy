package com.streamingproxy.backend.dto;

import java.time.Instant;

/**
 * Uniform error payload returned by {@code GlobalExceptionHandler}.
 */
public record ErrorResponseDto(Instant timestamp, int status, String error, String message, String path) {

    public static ErrorResponseDto of(int status, String error, String message, String path) {
        return new ErrorResponseDto(Instant.now(), status, error, message, path);
    }
}
