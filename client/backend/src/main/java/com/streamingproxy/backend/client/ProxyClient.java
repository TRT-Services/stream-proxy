package com.streamingproxy.backend.client;

import com.streamingproxy.backend.dto.SearchResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.io.InputStream;

/**
 * Thin wrapper around {@link RestClient} that talks to the Node.js streaming proxy.
 */
@Slf4j
@Component
public class ProxyClient {

    private final RestClient restClient;

    public ProxyClient(RestClient proxyRestClient) {
        this.restClient = proxyRestClient;
    }

    /**
     * Calls {@code GET /stream} on the proxy and returns the response with the body stream
     * left open (exchange's {@code close=false}) so it can be piped straight to the client.
     */
    public ProxyStreamResponse streamVideo(String videoUrl, String rangeHeader) {
        return restClient.get()
                .uri(uriBuilder -> uriBuilder.path("/stream").queryParam("url", videoUrl).build())
                .headers(headers -> {
                    if (rangeHeader != null && !rangeHeader.isBlank()) {
                        headers.set(HttpHeaders.RANGE, rangeHeader);
                    }
                })
                .exchange((request, response) -> {
                    InputStream body = response.getBody();
                    HttpHeaders headers = response.getHeaders();
                    int statusCode = response.getStatusCode().value();
                    log.debug("Proxy responded {} for {}", statusCode, videoUrl);
                    return new ProxyStreamResponse(statusCode, headers, body);
                }, false);
    }

    /** Calls {@code GET /search} on the proxy, which delegates to the official YouTube Data API. */
    public SearchResponseDto searchVideos(String query, Integer maxResults) {
        return restClient.get()
                .uri(uriBuilder -> {
                    uriBuilder.path("/search").queryParam("q", query);
                    if (maxResults != null) {
                        uriBuilder.queryParam("maxResults", maxResults);
                    }
                    return uriBuilder.build();
                })
                .retrieve()
                .body(SearchResponseDto.class);
    }
}
