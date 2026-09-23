package com.streamingproxy.backend.client;

import org.springframework.http.HttpHeaders;

import java.io.InputStream;

/**
 * Raw result of a proxy call: status, headers and the still-open response body stream.
 * Callers are responsible for consuming/closing {@code body}.
 */
public record ProxyStreamResponse(int statusCode, HttpHeaders headers, InputStream body) {
}
