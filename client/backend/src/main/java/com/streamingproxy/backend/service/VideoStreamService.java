package com.streamingproxy.backend.service;

import com.streamingproxy.backend.client.ProxyClient;
import com.streamingproxy.backend.client.ProxyStreamResponse;
import com.streamingproxy.backend.exception.ProxyUnavailableException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;

import java.util.List;

@Slf4j
@Service
public class VideoStreamService {

    private static final List<String> FORWARDED_HEADERS = List.of(
            HttpHeaders.CONTENT_TYPE, HttpHeaders.CONTENT_LENGTH, HttpHeaders.ACCEPT_RANGES, HttpHeaders.CONTENT_RANGE
    );

    private final ProxyClient proxyClient;

    public VideoStreamService(ProxyClient proxyClient) {
        this.proxyClient = proxyClient;
    }

    /** Streams the resolved video straight through as an {@link InputStreamResource}, no buffering. */
    public ResponseEntity<InputStreamResource> streamVideo(String videoUrl, String rangeHeader) {
        ProxyStreamResponse proxyResponse;
        try {
            proxyResponse = proxyClient.streamVideo(videoUrl, rangeHeader);
        } catch (RestClientException ex) {
            throw new ProxyUnavailableException("The streaming proxy is unreachable.", ex);
        }

        HttpHeaders responseHeaders = new HttpHeaders();
        for (String headerName : FORWARDED_HEADERS) {
            String value = proxyResponse.headers().getFirst(headerName);
            if (value != null) {
                responseHeaders.set(headerName, value);
            }
        }
        responseHeaders.setAccessControlExposeHeaders(FORWARDED_HEADERS);
        if (!responseHeaders.containsKey(HttpHeaders.CONTENT_TYPE)) {
            responseHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        }

        log.info("Streaming video status={} contentLength={}", proxyResponse.statusCode(),
                responseHeaders.getFirst(HttpHeaders.CONTENT_LENGTH));

        return ResponseEntity.status(proxyResponse.statusCode())
                .headers(responseHeaders)
                .body(new InputStreamResource(proxyResponse.body()));
    }
}
