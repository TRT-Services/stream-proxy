package com.streamingproxy.backend.service;

import com.streamingproxy.backend.client.ProxyClient;
import com.streamingproxy.backend.dto.SearchResponseDto;
import com.streamingproxy.backend.exception.ProxyUnavailableException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;

@Slf4j
@Service
public class VideoSearchService {

    private final ProxyClient proxyClient;

    public VideoSearchService(ProxyClient proxyClient) {
        this.proxyClient = proxyClient;
    }

    public SearchResponseDto search(String query, Integer maxResults) {
        try {
            return proxyClient.searchVideos(query, maxResults);
        } catch (RestClientException ex) {
            throw new ProxyUnavailableException("The streaming proxy is unreachable.", ex);
        }
    }
}
