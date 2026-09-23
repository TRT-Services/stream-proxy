package com.streamingproxy.backend.exception;

import com.streamingproxy.backend.dto.ErrorResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.RestClientException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({ IllegalArgumentException.class, MissingServletRequestParameterException.class })
    public ResponseEntity<ErrorResponseDto> handleBadRequest(Exception ex, HttpServletRequest request) {
        log.warn("Bad request on {}: {}", request.getRequestURI(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponseDto.of(HttpStatus.BAD_REQUEST.value(), "BadRequest", ex.getMessage(), request.getRequestURI()));
    }

    @ExceptionHandler(ProxyUnavailableException.class)
    public ResponseEntity<ErrorResponseDto> handleProxyUnavailable(ProxyUnavailableException ex, HttpServletRequest request) {
        log.error("Proxy unavailable for {}: {}", request.getRequestURI(), ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                .body(ErrorResponseDto.of(HttpStatus.BAD_GATEWAY.value(), "ProxyUnavailable", ex.getMessage(), request.getRequestURI()));
    }

    @ExceptionHandler(RestClientException.class)
    public ResponseEntity<ErrorResponseDto> handleRestClientException(RestClientException ex, HttpServletRequest request) {
        log.error("Upstream call failed for {}: {}", request.getRequestURI(), ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                .body(ErrorResponseDto.of(HttpStatus.BAD_GATEWAY.value(), "UpstreamError", "Failed to reach the streaming proxy.", request.getRequestURI()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDto> handleGeneric(Exception ex, HttpServletRequest request) {
        log.error("Unhandled exception on {}: {}", request.getRequestURI(), ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponseDto.of(HttpStatus.INTERNAL_SERVER_ERROR.value(), "InternalServerError", "An unexpected error occurred.", request.getRequestURI()));
    }
}
