package com.streamingproxy.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfig {

    /**
     * RestClient pre-configured with the proxy base URL and the shared internal API key
     * so every call site automatically authenticates with the Node.js proxy.
     */
    @Bean
    public RestClient proxyRestClient(
            @Value("${proxy.server.url}") String proxyServerUrl,
            @Value("${proxy.server.api-key}") String proxyApiKey) {
        return RestClient.builder()
                .baseUrl(proxyServerUrl)
                .defaultHeader("X-Internal-Api-Key", proxyApiKey)
                .build();
    }
}
